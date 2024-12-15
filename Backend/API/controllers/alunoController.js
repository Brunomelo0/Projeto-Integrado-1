const db = require('../models/db');

exports.getAlunos = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Aluno');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAlunoById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM Aluno WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAluno = async (req, res) => {
  try {
    const { nome, data_nascimento, contato, matricula } = req.body;
    const result = await db.query(
      'INSERT INTO Aluno (nome, data_nascimento, contato, matricula) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, data_nascimento, contato, matricula]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, data_nascimento, contato, matricula } = req.body;
    const result = await db.query(
      'UPDATE Aluno SET nome = $1, data_nascimento = $2, contato = $3, matricula = $4 WHERE id = $5 RETURNING *',
      [nome, data_nascimento, contato, matricula, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAluno = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Aluno WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};