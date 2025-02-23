const db = require('../models/db');

exports.getFrequencias = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Frequencia');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFrequenciaById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM Frequencia WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Frequência não encontrada" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createFrequencia = async (req, res) => {
  try {
    const frequencias = req.body;

    if (!Array.isArray(frequencias)) {
      return res.status(400).json({ error: "O corpo da requisição deve ser um array de objetos de frequência" });
    }

    const query = `
      INSERT INTO Frequencia (data, turma_id, aluno_id, presenca)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const results = [];

    for (const frequencia of frequencias) {
      const { aluno_id, turma_id, data, presenca } = frequencia;

      if (typeof presenca !== 'boolean') {
        return res.status(400).json({ error: "O atributo 'presenca' deve ser um valor booleano" });
      }

      const result = await db.query(query, [data, turma_id, aluno_id, presenca]);
      results.push(result.rows[0]);
    }

    res.status(201).json(results);
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ error: "Registro de frequência já existe" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

exports.updateFrequencia = async (req, res) => {
  try {
    const { aluno_id, turma_id, data } = req.params;
    const { presenca } = req.body;

    if (typeof presenca !== 'boolean') {
      return res.status(400).json({ error: "O atributo 'presenca' deve ser um valor booleano" });
    }

    const query = `
      UPDATE Frequencia
      SET presenca = $1
      WHERE aluno_id = $2 AND turma_id = $3 AND data = $4
      RETURNING *;
    `;

    const result = await db.query(query, [presenca, aluno_id, turma_id, data]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Registro de frequência não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFrequencia = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM Frequencia WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Frequência não encontrada" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFrequenciaAluno = async (req, res) => {
  try {
    const { aluno_id, turma_id } = req.params;

    const query = `
      SELECT 
        COALESCE(COUNT(*) FILTER (WHERE presenca = TRUE), 0) AS total_presencas,
        COALESCE(COUNT(*) FILTER (WHERE presenca = FALSE), 0) AS total_faltas,
        CASE 
          WHEN COUNT(*) = 0 THEN 0 
          ELSE ROUND(COALESCE(COUNT(*) FILTER (WHERE presenca = TRUE), 0)::DECIMAL * 100 / COUNT(*), 2) 
        END AS porcentagem_presencas
      FROM Frequencia
      WHERE aluno_id = $1 AND turma_id = $2;
    `;

    const result = await db.query(query, [aluno_id, turma_id]);

    if (!result.rows.length || (result.rows[0].total_presencas === 0 && result.rows[0].total_faltas === 0)) {
      return res.status(404).json({ error: "Nenhuma frequência encontrada para este aluno na turma" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getFrequenciasComAlunos = async (req, res) => {
  try {
    const query = `
      SELECT 
        f.id,
        f.data,
        f.presenca,
        f.turma_id,
        f.aluno_id,
        a.nome AS aluno_nome
      FROM Frequencia f
      JOIN Aluno a ON f.aluno_id = a.id;
    `;

    const result = await db.query(query);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Novo endpoint para associar frequências a uma turma
exports.associateFrequenciasToTurma = async (req, res) => {
  try {
    const { turmaId, frequencias } = req.body;
    const queries = frequencias.map(frequencia => {
      return db.query(
        'INSERT INTO Frequencia (data, aluno_id, turma_id, presente) VALUES ($1, $2, $3, $4) RETURNING *',
        [frequencia.data, frequencia.aluno_id, turmaId, frequencia.presente]
      );
    });
    const results = await Promise.all(queries);
    res.status(201).json(results.map(result => result.rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};