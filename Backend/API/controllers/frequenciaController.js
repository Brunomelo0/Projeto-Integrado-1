// controllers/frequenciaController.js
const pool = require('../models/db');

// Listar frequências de uma aula
const getFrequencias = async (req, res) => {
  const { id_aula } = req.params;
  try {
    const result = await pool.query('SELECT * FROM frequencia WHERE id_aula = $1', [id_aula]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar frequências' });
  }
};

// Registrar frequência de um aluno
const createFrequencia = async (req, res) => {
  const { matricula, id_aula, presente } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO frequencia (matricula, id_aula, presente) VALUES ($1, $2, $3) RETURNING *',
      [matricula, id_aula, presente]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar frequência' });
  }
};

module.exports = { getFrequencias, createFrequencia };
