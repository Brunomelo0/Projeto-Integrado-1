const db = require('../models/db');

exports.getDiagnosticos = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT d.id, d.descricao, d.status, d.aluno_id, a.nome AS aluno_nome, a.matricula, a.data_nascimento, a.contato, a.turma_id
      FROM Diagnostico d
      JOIN Aluno a ON d.aluno_id = a.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDiagnosticoById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`
      SELECT d.id, d.descricao, d.status, d.aluno_id, a.nome AS aluno_nome, a.matricula, a.data_nascimento, a.contato, a.turma_id
      FROM Diagnostico d
      JOIN Aluno a ON d.aluno_id = a.id
      WHERE d.id = $1
    `, [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDiagnostico = async (req, res) => {
  try {
    const { descricao, status, aluno_id } = req.body;
    const result = await db.query(
      'INSERT INTO Diagnostico (descricao, status, aluno_id) VALUES ($1, $2, $3) RETURNING *',
      [descricao, status, aluno_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDiagnostico = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, status, aluno_id } = req.body;
    const result = await db.query(
      'UPDATE Diagnostico SET descricao = $1, status = $2, aluno_id = $3 WHERE id = $4 RETURNING *',
      [descricao, status, aluno_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDiagnostico = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Diagnostico WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
