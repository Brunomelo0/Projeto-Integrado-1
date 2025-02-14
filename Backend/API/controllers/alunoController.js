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
    const { nome, data_nascimento, contato, matricula, turma_id } = req.body;
    const result = await db.query(
      'INSERT INTO Aluno (nome, data_nascimento, contato, matricula, turma_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, data_nascimento, contato, matricula, Number(turma_id)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, data_nascimento, contato, matricula, turma_id } = req.body;
    const result = await db.query(
      'UPDATE Aluno SET nome = $1, data_nascimento = $2, contato = $3, matricula = $4, turma_id = $5 WHERE id = $6 RETURNING *',
      [nome, data_nascimento, contato, matricula, turma_id, id]
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

exports.removeAlunoFromTurma = async (req, res) => {
  const { id } = req.params;
  try {
    // Atualizar o campo turma_id do aluno para NULL
    await db.query('UPDATE Aluno SET turma_id = NULL WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};