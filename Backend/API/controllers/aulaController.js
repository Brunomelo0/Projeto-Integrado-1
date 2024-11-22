// controllers/aulaController.js
const pool = require('../models/db');

// Listar todas as aulas
const getAulas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM aulas');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar aulas' });
  }
};

// Criar aula
const createAula = async (req, res) => {
  const { id_turma, id_disciplina, data, horario } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO aulas (id_turma, id_disciplina, data, horario) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_turma, id_disciplina, data, horario]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar aula' });
  }
};

module.exports = { getAulas, createAula };
