const db = require('../models/db');

exports.getProfessoresTurmas = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT pt.professor_id, pt.turma_id, p.nome AS professor_nome, t.nome AS turma_nome 
       FROM Professor_Turma pt 
       INNER JOIN Professor p ON pt.professor_id = p.id 
       INNER JOIN Turma t ON pt.turma_id = t.id`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addProfessorToTurma = async (req, res) => {
  try {
    const { professor_id, turma_id } = req.body;
    const result = await db.query(
      'INSERT INTO Professor_Turma (professor_id, turma_id) VALUES ($1, $2) RETURNING *',
      [professor_id, turma_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeProfessorFromTurma = async (req, res) => {
  try {
    const { professor_id, turma_id } = req.body;
    await db.query('DELETE FROM Professor_Turma WHERE professor_id = $1 AND turma_id = $2', [professor_id, turma_id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
