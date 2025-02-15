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
    const result = await db.query('SELECT * FROM Professor');
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
    const { nome, dataNascimento, turmas, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir professor na tabela Professor
    const result = await db.query(
      'INSERT INTO Professor (nome, dataNascimento) VALUES ($1, $2) RETURNING *',
      [nome, dataNascimento]
    );
    const professor = result.rows[0];

    // Inserir turmas na tabela Professor_Turma
    if (turmas && turmas.length > 0) {
      for (const turmaId of turmas) {
        await db.query(
          'INSERT INTO Professor_Turma (professor_id, turma_id) VALUES ($1, $2)',
          [professor.id, turmaId]
        );
      }
    }

    // Criar um registro de usuário para login
    await db.query(
      'INSERT INTO Users (username, password, role) VALUES ($1, $2, $3)',
      [username, hashedPassword, 'professor']
    );

    res.status(201).json(professor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, dataNascimento, turmas } = req.body;

    // Atualizar professor na tabela Professor
    const result = await db.query(
      'UPDATE Professor SET nome = $1, dataNascimento = $2 WHERE id = $3 RETURNING *',
      [nome, dataNascimento, id]
    );
    const professor = result.rows[0];

    // Atualizar turmas na tabela Professor_Turma
    await db.query('DELETE FROM Professor_Turma WHERE professor_id = $1', [id]);
    if (turmas && turmas.length > 0) {
      for (const turmaId of turmas) {
        await db.query(
          'INSERT INTO Professor_Turma (professor_id, turma_id) VALUES ($1, $2)',
          [id, turmaId]
        );
      }
    }

    res.status(200).json(professor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Professor WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
