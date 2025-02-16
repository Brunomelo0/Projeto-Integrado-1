const db = require('../models/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'senha_professor';

exports.loginProfessor = async (req, res) => {
  try {
    const { nome, senha } = req.body;
    const result = await db.query('SELECT * FROM Professor WHERE nome = $1', [nome]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Nome ou senha inválidos' });
    }

    const professor = result.rows[0];
    const senhaValida = await bcrypt.compare(senha, professor.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Nome ou senha inválidos' });
    }

    const token = jwt.sign({ id: professor.id, nome: professor.nome }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfessores = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT p.id, p.nome, p.contato, p.dataNascimento, 
             ARRAY_AGG(t.nome) AS turmas
      FROM Professor p
      LEFT JOIN Professor_Turma pt ON p.id = pt.professor_id
      LEFT JOIN Turma t ON pt.turma_id = t.id
      GROUP BY p.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfessorById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM Professor WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProfessor = async (req, res) => {
  try {
    const { nome, contato, dataNascimento, turmas, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      'INSERT INTO Professor (nome, contato, dataNascimento) VALUES ($1, $2, $3) RETURNING *',
      [nome, contato, dataNascimento]
    );
    const professor = result.rows[0];

    if (turmas && turmas.length > 0) {
      const turmaQueries = turmas.map(turmaId => (
        db.query('INSERT INTO Professor_Turma (professor_id, turma_id) VALUES ($1, $2)', [professor.id, turmaId])
      ));
      await Promise.all(turmaQueries);
    }

    try {
      await db.query(
        'INSERT INTO Users (username, password, role) VALUES ($1, $2, $3)',
        [username, hashedPassword, 'professor']
      );
    } catch (err) {
      // Se houver um conflito de username, remova o professor criado e retorne um erro
      await db.query('DELETE FROM Professor WHERE id = $1', [professor.id]);
      return res.status(400).json({ error: 'Username já está em uso' });
    }

    res.status(201).json(professor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, contato, dataNascimento, turmas } = req.body;

    const result = await db.query(
      'UPDATE Professor SET nome = $1, contato = $2, dataNascimento = $3 WHERE id = $4 RETURNING *',
      [nome, contato, dataNascimento, id]
    );
    const professor = result.rows[0];

    await db.query('DELETE FROM Professor_Turma WHERE professor_id = $1', [id]);
    if (turmas && turmas.length > 0) {
      const turmaQueries = turmas.map(turmaId => (
        db.query('INSERT INTO Professor_Turma (professor_id, turma_id) VALUES ($1, $2)', [id, turmaId])
      ));
      await Promise.all(turmaQueries);
    }

    res.status(200).json(professor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    // Primeiro, remova as associações do professor com as turmas
    await db.query('DELETE FROM Professor_Turma WHERE professor_id = $1', [id]);
    // Em seguida, remova o professor
    await db.query('DELETE FROM Professor WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
