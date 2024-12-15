const db = require('../models/db');

exports.getAlunosTurmas = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT at.aluno_id, at.turma_id, a.nome AS aluno_nome, t.nome AS turma_nome 
       FROM Aluno_Turma at 
       INNER JOIN Aluno a ON at.aluno_id = a.id 
       INNER JOIN Turma t ON at.turma_id = t.id`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addAlunoToTurma = async (req, res) => {
  try {
    const { aluno_id, turma_id } = req.body;
    const result = await db.query(
      'INSERT INTO Aluno_Turma (aluno_id, turma_id) VALUES ($1, $2) RETURNING *',
      [aluno_id, turma_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeAlunoFromTurma = async (req, res) => {
  try {
    const { aluno_id, turma_id } = req.body;
    await db.query('DELETE FROM Aluno_Turma WHERE aluno_id = $1 AND turma_id = $2', [aluno_id, turma_id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
