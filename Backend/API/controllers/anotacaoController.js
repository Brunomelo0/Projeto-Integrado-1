// controllers/anotacaoController.js
const pool = require('../models/db');

// Listar todas as anotações de um aluno
const getAnotacoes = async (req, res) => {
  const { matricula } = req.params;
  try {
    const result = await pool.query('SELECT * FROM anotacoes WHERE matricula = $1', [matricula]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar anotações' });
  }
};

// Criar anotação
const createAnotacao = async (req, res) => {
  const { id_professor, matricula, anotacao } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO anotacoes (id_professor, matricula, anotacao) VALUES ($1, $2, $3) RETURNING *',
      [id_professor, matricula, anotacao]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar anotação' });
  }
};

module.exports = { getAnotacoes, createAnotacao };
