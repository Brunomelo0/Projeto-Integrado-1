const db = require('../models/db');

exports.getRelatorios = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Relatorio');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRelatorioById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM Relatorio WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRelatorio = async (req, res) => {
  try {
    const { arquivo, data, descricao, professor_id } = req.body;
    const result = await db.query(
      'INSERT INTO Relatorio (arquivo, data, descricao, professor_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [arquivo, data, descricao, professor_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRelatorio = async (req, res) => {
  try {
    const { id } = req.params;
    const { arquivo, data, descricao, professor_id } = req.body;
    const result = await db.query(
      'UPDATE Relatorio SET arquivo = $1, data = $2, descricao = $3, professor_id = $4 WHERE id = $5 RETURNING *',
      [arquivo, data, descricao, professor_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRelatorio = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Relatorio WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
