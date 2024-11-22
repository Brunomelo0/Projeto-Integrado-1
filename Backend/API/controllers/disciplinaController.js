// controllers/disciplinaController.js
const pool = require('../models/db');

// Listar todas as disciplinas
const getDisciplinas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM disciplinas');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar disciplinas' });
  }
};

// Criar disciplina
const createDisciplina = async (req, res) => {
  const { nome_disciplina } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO disciplinas (nome_disciplina) VALUES ($1) RETURNING *',
      [nome_disciplina]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar disciplina' });
  }
};

module.exports = { getDisciplinas, createDisciplina };
