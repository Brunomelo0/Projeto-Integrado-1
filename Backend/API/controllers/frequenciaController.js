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
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createFrequencia = async (req, res) => {
  try {
    const { data, porcentagem, turma_id } = req.body;
    const result = await db.query(
      'INSERT INTO Frequencia (data, porcentagem, turma_id) VALUES ($1, $2, $3) RETURNING *',
      [data, porcentagem, turma_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFrequencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, porcentagem, turma_id } = req.body;
    const result = await db.query(
      'UPDATE Frequencia SET data = $1, porcentagem = $2, turma_id = $3 WHERE id = $4 RETURNING *',
      [data, porcentagem, turma_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFrequencia = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Frequencia WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
