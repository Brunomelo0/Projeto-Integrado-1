const express = require('express');
const alunoController = require('../controllers/alunoController');
const diretorController = require('../controllers/diretorController');
const professorController = require('../controllers/professorController');
const turmaController = require('../controllers/turmaController');
const diarioController = require('../controllers/diarioController');
const frequenciaController = require('../controllers/frequenciaController');
const relatorioController = require('../controllers/relatorioController');
const diagnosticoController = require('../controllers/diagnosticoController');
const alunoTurmaController = require('../controllers/alunoTurmaController');
const professorTurmaController = require('../controllers/professorTurmaController');

const router = express.Router();

// Rotas para Aluno
router.get('/alunos', alunoController.getAlunos);
router.get('/alunos/:id', alunoController.getAlunoById);
router.post('/alunos', alunoController.createAluno);
router.put('/alunos/:id', alunoController.updateAluno);
router.delete('/alunos/:id', alunoController.deleteAluno);

// Rotas para Diretor
router.get('/diretores', diretorController.getDiretores);
router.get('/diretores/:id', diretorController.getDiretorById);
router.post('/diretores', diretorController.createDiretor);
router.put('/diretores/:id', diretorController.updateDiretor);
router.delete('/diretores/:id', diretorController.deleteDiretor);

// Rotas para Professor
router.get('/professores', professorController.getProfessores);
router.get('/professores/:id', professorController.getProfessorById);
router.post('/professores', professorController.createProfessor);
router.put('/professores/:id', professorController.updateProfessor);
router.delete('/professores/:id', professorController.deleteProfessor);

// Rotas para Turma
router.get('/turmas', turmaController.getTurmas);
router.get('/turmas/:id', turmaController.getTurmaById);
router.post('/turmas', turmaController.createTurma);
router.put('/turmas/:id', turmaController.updateTurma);
router.delete('/turmas/:id', turmaController.deleteTurma);

// Rotas para Diario
router.get('/diarios', diarioController.getDiarios);
router.get('/diarios/:id', diarioController.getDiarioById);
router.post('/diarios', diarioController.createDiario);
router.put('/diarios/:id', diarioController.updateDiario);
router.delete('/diarios/:id', diarioController.deleteDiario);

// Rotas para Frequencia
router.get('/frequencias', frequenciaController.getFrequencias);
router.get('/frequencias/:id', frequenciaController.getFrequenciaById);
router.post('/frequencias', frequenciaController.createFrequencia);
router.put('/frequencias/:id', frequenciaController.updateFrequencia);
router.delete('/frequencias/:id', frequenciaController.deleteFrequencia);

// Rotas para Relatorio
router.get('/relatorios', relatorioController.getRelatorios);
router.get('/relatorios/:id', relatorioController.getRelatorioById);
router.post('/relatorios', relatorioController.createRelatorio);
router.put('/relatorios/:id', relatorioController.updateRelatorio);
router.delete('/relatorios/:id', relatorioController.deleteRelatorio);

// Rotas para Diagnostico
router.get('/diagnosticos', diagnosticoController.getDiagnosticos);
router.get('/diagnosticos/:id', diagnosticoController.getDiagnosticoById);
router.post('/diagnosticos', diagnosticoController.createDiagnostico);
router.put('/diagnosticos/:id', diagnosticoController.updateDiagnostico);
router.delete('/diagnosticos/:id', diagnosticoController.deleteDiagnostico);

// Rotas para Aluno_Turma
router.get('/alunos-turmas', alunoTurmaController.getAlunosTurmas);
router.post('/alunos-turmas', alunoTurmaController.addAlunoToTurma);
router.delete('/alunos-turmas', alunoTurmaController.removeAlunoFromTurma);

// Rotas para Professor_Turma
router.get('/professores-turmas', professorTurmaController.getProfessoresTurmas);
router.post('/professores-turmas', professorTurmaController.addProfessorToTurma);
router.delete('/professores-turmas', professorTurmaController.removeProfessorFromTurma);

module.exports = router;