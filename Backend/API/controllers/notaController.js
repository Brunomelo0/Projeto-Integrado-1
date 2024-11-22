// controllers/notaController.js
const pool = require('../models/db');

// Listar notas de um aluno em uma disciplina
const getNotas = async (req, res) => {
  const { matricula, id_disciplina } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM notas WHERE matricula = $1 AND id_disciplina = $2',
      [matricula, id_disciplina]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar notas' });
  }
};

// Criar ou atualizar nota de um aluno
const createNota = async (req, res) => {
  const { matricula, id_disciplina, nota } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO notas (matricula, id_disciplina, nota) VALUES ($1, $2, $3) RETURNING *',
      [matricula, id_disciplina, nota]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar nota' });
  }
};

module.exports = { getNotas, createNota };
