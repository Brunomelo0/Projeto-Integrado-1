const db = require('../models/db');

exports.getProfessores = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Professor');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfessorById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM Professor WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProfessor = async (req, res) => {
  try {
    const { nome, contato, senha, turma_id } = req.body;
    const result = await db.query(
      'INSERT INTO Professor (nome, contato, senha, turma_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, contato, senha, Number(turma_id)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, contato, senha, turma_id } = req.body;
    const result = await db.query(
      'UPDATE Professor SET nome = $1, contato = $2, senha = $3, turma_id = $4 WHERE id = $5 RETURNING *',
      [nome, contato, senha, turma_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Professor WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
