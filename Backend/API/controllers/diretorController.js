const db = require('../models/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'senha_diretor';

exports.loginDiretor = async (req, res) => {
  try {
    const { nome, senha } = req.body;
    const result = await db.query('SELECT * FROM Diretor WHERE nome = $1', [nome]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Nome ou senha inválidos' });
    }

    const diretor = result.rows[0];
    const senhaValida = await bcrypt.compare(senha, diretor.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Nome ou senha inválidos' });
    }

    const token = jwt.sign({ id: diretor.id, nome: diretor.nome }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDiretores = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Diretor');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDiretorById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM Diretor WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDiretor = async (req, res) => {
  try {
    const { nome, contato, senha } = req.body;
    const result = await db.query(
      'INSERT INTO Diretor (nome, contato, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, contato, senha]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDiretor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, contato, senha } = req.body;
    const result = await db.query(
      'UPDATE Diretor SET nome = $1, contato = $2, senha = $3 WHERE id = $4 RETURNING *',
      [nome, contato, senha, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDiretor = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Diretor WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
