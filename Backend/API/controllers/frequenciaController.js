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

exports.createPresenca = async (req, res) => {
  try {
    const { aluno_id, turma_id, data } = req.params;
    const { presenca } = req.body;

    if (typeof presenca !== 'boolean') {
      return res.status(400).json({ error: "O atributo 'presenca' deve ser um valor booleano" });
    }

    const query = `
      INSERT INTO Frequencia (data, turma_id, aluno_id, presenca)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await db.query(query, [data, turma_id, aluno_id, presenca]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ error: "Registro de frequência já existe" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};


exports.updatePresenca = async (req, res) => {
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
        COUNT(*) FILTER (WHERE presenca = TRUE) AS total_presencas,
        COUNT(*) FILTER (WHERE presenca = FALSE) AS total_faltas,
        ROUND(
          COUNT(*) FILTER (WHERE presenca = TRUE)::DECIMAL * 100 / NULLIF(COUNT(*), 0), 
          2
        ) AS porcentagem_presencas
      FROM Frequencia
      WHERE aluno_id = $1 AND turma_id = $2;
    `;

    const result = await db.query(query, [aluno_id, turma_id]);

    if (result.rows.length === 0 || !result.rows[0].total_presencas && !result.rows[0].total_faltas) {
      return res.status(404).json({ error: "Nenhuma frequência encontrada para este aluno na turma" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};