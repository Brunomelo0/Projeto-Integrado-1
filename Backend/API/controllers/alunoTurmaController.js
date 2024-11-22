// controllers/alunoTurmaController.js
const pool = require('../models/db');

// Listar todos os alunos matriculados em uma turma
const getAlunosTurma = async (req, res) => {
  const { id_turma } = req.params;
  try {
    const result = await pool.query(
      'SELECT a.matricula, a.nome FROM alunos a JOIN alunos_turmas at ON a.matricula = at.matricula WHERE at.id_turma = $1',
      [id_turma]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar alunos da turma' });
  }
};

// Matrícula de aluno em uma turma
const matricularAluno = async (req, res) => {
  const { matricula, id_turma } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO alunos_turmas (matricula, id_turma) VALUES ($1, $2) RETURNING *',
      [matricula, id_turma]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao matricular aluno' });
  }
};

module.exports = { getAlunosTurma, matricularAluno };
