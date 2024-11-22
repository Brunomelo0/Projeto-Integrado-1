// controllers/professorController.js
const pool = require('../models/db');

// Listar todos os professores
const getProfessores = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM professores');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar professores' });
  }
};

// Criar professor
const createProfessor = async (req, res) => {
  const { nome, data_nascimento, endereco, email, telefone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO professores (nome, data_nascimento, endereco, email, telefone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, data_nascimento, endereco, email, telefone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar professor' });
  }
};

module.exports = { getProfessores, createProfessor };
