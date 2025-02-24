const db = require('../models/db');
const PDFDocument = require('pdfkit');

exports.generateRelatorioPDF = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `SELECT r.descricao AS relatorio_descricao, p.nome AS professor, t.nome AS turma,
              d.descricao AS diagnostico_descricao, d.status AS diagnostico_status, d.semestre,
              a.nome AS aluno, f.presenca
       FROM Relatorio r
       JOIN Professor p ON r.professor_id = p.id
       JOIN Turma t ON r.turma_id = t.id
       JOIN Aluno a ON r.aluno_id = a.id
       LEFT JOIN Diagnostico d ON a.id = d.aluno_id
       LEFT JOIN Frequencia f ON a.id = f.aluno_id AND f.turma_id = t.id
       WHERE r.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Relatório não encontrado' });
    }

    const relatorio = result.rows[0];

    res.setHeader('Content-Disposition', `attachment; filename=relatorio_${id}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');

    const doc = new PDFDocument();
    doc.pipe(res);

    doc.fontSize(18).text('Relatório', { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(14).text('Descrição:', { bold: true });
    doc.fontSize(12).text(relatorio.relatorio_descricao || 'Não informado');
    doc.moveDown();

    doc.fontSize(14).text('Professor:', { bold: true });
    doc.fontSize(12).text(relatorio.professor || 'Não informado');
    doc.moveDown();

    doc.fontSize(14).text('Turma:', { bold: true });
    doc.fontSize(12).text(relatorio.turma || 'Não informado');
    doc.moveDown();

    doc.fontSize(14).text('Aluno:', { bold: true });
    doc.fontSize(12).text(relatorio.aluno || 'Não informado');
    doc.moveDown();

    doc.fontSize(14).text('Diagnóstico:', { bold: true });
    doc.fontSize(12).text(`Status: ${relatorio.diagnostico_status || 'Não informado'}`);
    doc.fontSize(12).text(`Descrição: ${relatorio.diagnostico_descricao || 'Não informado'}`);
    doc.fontSize(12).text(`Semestre: ${relatorio.semestre || 'Não informado'}`);
    doc.moveDown();

    doc.fontSize(14).text('Presença do Aluno:', { bold: true });
    doc.fontSize(12).text(relatorio.presenca ? 'Presente' : 'Ausente');
    doc.moveDown();

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRelatorios = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT r.id, r.titulo, r.data, r.descricao, a.nome AS aluno_nome, r.professor_id, r.turma_id, r.aluno_id
      FROM Relatorio r
      JOIN Aluno a ON r.aluno_id = a.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRelatorioById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`
      SELECT r.id, r.titulo, r.data, r.descricao, a.nome AS aluno_nome, r.professor_id, r.turma_id, r.aluno_id
      FROM Relatorio r
      JOIN Aluno a ON r.aluno_id = a.id
      WHERE r.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Relatório não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRelatorio = async (req, res) => {
  try {
    const {titulo, data, descricao, aluno_id, professor_id, turma_id } = req.body;
    const result = await db.query(
      'INSERT INTO Relatorio (titulo, data, descricao, aluno_id, professor_id, turma_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [titulo, data, descricao, aluno_id, professor_id, turma_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRelatorio = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, data, descricao, aluno_id, professor_id, turma_id } = req.body;
    const result = await db.query(
      'UPDATE Relatorio SET titulo = $1, data = $2, descricao = $3, aluno_id = $4, professor_id = $5, turma_id = $6 WHERE id = $7 RETURNING *',
      [titulo, data, descricao, aluno_id, professor_id, turma_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRelatorio = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Relatorio WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
