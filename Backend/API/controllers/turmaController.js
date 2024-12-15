const db = require('../models/db');

exports.getTurmas = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Turma');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTurmaById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM Turma WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTurma = async (req, res) => {
  try {
    const { nome, periodo } = req.body;
    const result = await db.query(
      'INSERT INTO Turma (nome, periodo) VALUES ($1, $2) RETURNING *',
      [nome, periodo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, periodo } = req.body;
    const result = await db.query(
      'UPDATE Turma SET nome = $1, periodo = $2 WHERE id = $3 RETURNING *',
      [nome, periodo, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTurma = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Turma WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
