// controllers/turmaController.js
const pool = require('../models/db');

// Listar todas as turmas
const getTurmas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM turmas');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar turmas' });
  }
};

// Criar turma
const createTurma = async (req, res) => {
  const { nome_turma, ano_letivo, periodo, id_professor_principal } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO turmas (nome_turma, ano_letivo, periodo, id_professor_principal) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome_turma, ano_letivo, periodo, id_professor_principal]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar turma' });
  }
};

module.exports = { getTurmas, createTurma };
