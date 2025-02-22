const db = require('../models/db');
const PDFDocument = require('pdfkit');

exports.generateRelatorioPDF = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(`
      SELECT r.descricao, p.nome AS professor, t.nome AS turma
      FROM Relatorio r
      JOIN Professor p ON r.professor_id = p.id
      JOIN Turma t ON r.turma_id = t.id
      WHERE r.id = $1
    `, [id]);

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

    doc.fontSize(14).text(`Descrição:`, { bold: true });
    doc.fontSize(12).text(relatorio.descricao || 'Não informado');
    doc.moveDown();

    doc.fontSize(14).text(`Professor:`, { bold: true });
    doc.fontSize(12).text(relatorio.professor || 'Não informado');
    doc.moveDown();

    doc.fontSize(14).text(`Turma:`, { bold: true });
    doc.fontSize(12).text(relatorio.turma || 'Não informado');
    doc.moveDown();

    doc.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRelatorios = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Relatorio');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRelatorioById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM Relatorio WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRelatorio = async (req, res) => {
  try {
    const { arquivo, data, descricao, professor_id } = req.body;
    const result = await db.query(
      'INSERT INTO Relatorio (arquivo, data, descricao, professor_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [arquivo, data, descricao, professor_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRelatorio = async (req, res) => {
  try {
    const { id } = req.params;
    const { arquivo, data, descricao, professor_id } = req.body;
    const result = await db.query(
      'UPDATE Relatorio SET arquivo = $1, data = $2, descricao = $3, professor_id = $4 WHERE id = $5 RETURNING *',
      [arquivo, data, descricao, professor_id, id]
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
