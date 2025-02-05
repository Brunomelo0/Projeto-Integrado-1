const db = require('../models/db');

exports.getDiarios = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Diario');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDiarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM Diario WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDiario = async (req, res) => {
  try {
    const { titulo, descricao, professor_id, data } = req.body;
    const result = await db.query(
      'INSERT INTO Diario (titulo, descricao, professor_id, data) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, descricao, professor_id, data]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDiario = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, professor_id, data } = req.body;
    const result = await db.query(
      'UPDATE Diario SET titulo = $1, descricao = $2, professor_id = $3, data = $4 WHERE id = $5 RETURNING *',
      [titulo, descricao, professor_id, data, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDiario = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Diario WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};