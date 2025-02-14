const db = require('../models/db');

exports.getDiarios = async (req, res) => {
  try {
    const { turma_id, data } = req.query;
    let query = 'SELECT * FROM Diario';
    let params = [];

    if (turma_id || data) {
      query += ' WHERE';
      if (turma_id) {
        params.push(turma_id);
        query += ` turma_id = $${params.length}`;
      }
      if (data) {
        if (params.length) query += ' AND';
        params.push(data);
        query += ` data = $${params.length}`;
      }
    }

    const result = await db.query(query, params);
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
    const { titulo, descricao, professor_id, data, turma_id } = req.body;
    const result = await db.query(
      'INSERT INTO Diario (titulo, descricao, professor_id, data, turma_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [titulo, descricao, professor_id, data, turma_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDiario = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, professor_id, data, turma_id } = req.body;
    const result = await db.query(
      'UPDATE Diario SET titulo = $1, descricao = $2, professor_id = $3, data = $4, turma_id = $5 WHERE id = $6 RETURNING *',
      [titulo, descricao, professor_id, data, turma_id, id]
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