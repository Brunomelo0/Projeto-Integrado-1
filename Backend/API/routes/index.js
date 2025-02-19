const express = require('express');
const alunoController = require('../controllers/alunoController');
const diretorController = require('../controllers/diretorController');
const professorController = require('../controllers/professorController');
const turmaController = require('../controllers/turmaController');
const diarioController = require('../controllers/diarioController');
const frequenciaController = require('../controllers/frequenciaController');
const relatorioController = require('../controllers/relatorioController');
const diagnosticoController = require('../controllers/diagnosticoController');
const userController = require('../controllers/userController');

const router = express.Router();

// Rotas para Usuarios
router.post('/users/login', userController.loginUser);
router.get('/users', userController.getUser);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Rotas para Aluno
router.get('/alunos', alunoController.getAlunos);
router.get('/alunos/:id', alunoController.getAlunoById);
router.post('/alunos', alunoController.createAluno);
router.put('/alunos/:id', alunoController.updateAluno);
router.delete('/alunos/:id', alunoController.deleteAluno);
router.put('/alunos/:id/removeFromTurma', alunoController.removeAlunoFromTurma);

// Rotas para Diretor
router.post('/loginDiretor', diretorController.loginDiretor);
router.get('/diretores', diretorController.getDiretores);
router.get('/diretores/:id', diretorController.getDiretorById);
router.post('/diretores', diretorController.createDiretor);
router.put('/diretores/:id', diretorController.updateDiretor);
router.delete('/diretores/:id', diretorController.deleteDiretor);

// Rotas para Professor
router.post('/loginProfessor', professorController.loginProfessor);
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
// Nova rota para buscar alunos de uma turma específica
router.get('/turmas/:id/alunos', turmaController.getAlunosByTurmaId);

// Rotas para Diario
router.get('/diarios', diarioController.getDiarios);
router.get('/diarios/:id', diarioController.getDiarioById);
router.post('/diarios', diarioController.createDiario);
router.put('/diarios/:id', diarioController.updateDiario);
router.delete('/diarios/:id', diarioController.deleteDiario);

// Rotas para Frequencia
router.get('/frequencias/:aluno_id/:turma_id', frequenciaController.getFrequenciaAluno);
router.post('/frequencias/:aluno_id/:turma_id/:data', frequenciaController.createPresenca);
router.put('/frequencias/:aluno_id/:turma_id/:data', frequenciaController.updatePresenca);
router.get('/frequencias', frequenciaController.getFrequencias);
router.get('/frequencias/:id', frequenciaController.getFrequenciaById);
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

module.exports = router;