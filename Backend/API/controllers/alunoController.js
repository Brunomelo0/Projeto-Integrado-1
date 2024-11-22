// controllers/alunoController.js
const pool = require('../models/db');

// Listar todos os alunos
const getAlunos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alunos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar alunos' });
  }
};

// Criar aluno
const createAluno = async (req, res) => {
  const { nome, data_nascimento, endereco, email, telefone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO alunos (nome, data_nascimento, endereco, email, telefone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, data_nascimento, endereco, email, telefone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar aluno' });
  }
};

module.exports = { getAlunos, createAluno };