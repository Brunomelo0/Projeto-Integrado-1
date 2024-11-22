// server.js
const express = require('express');
const cors = require('cors');
const alunoController = require('./controllers/alunoController');
const professorController = require('./controllers/professorController');
const turmaController = require('./controllers/turmaController');
const aulaController = require('./controllers/aulaController');
const frequenciaController = require('./controllers/frequenciaController');
const disciplinaController = require('./controllers/disciplinaController');
const anotacaoController = require('./controllers/anotacaoController');
const notaController = require('./controllers/notaController');
const alunoTurmaController = require('./controllers/alunoTurmaController');

const app = express();
app.use(express.json());
app.use(cors());

// Rotas para alunos
app.get('/alunos', alunoController.getAlunos);
app.post('/alunos', alunoController.createAluno);

// Rotas para professores
app.get('/professores', professorController.getProfessores);
app.post('/professores', professorController.createProfessor);

// Rotas para turmas
app.get('/turmas', turmaController.getTurmas);
app.post('/turmas', turmaController.createTurma);

// Rotas para aulas
app.get('/aulas', aulaController.getAulas);
app.post('/aulas', aulaController.createAula);

// Rotas para frequências
app.get('/frequencias/:id_aula', frequenciaController.getFrequencias);
app.post('/frequencias', frequenciaController.createFrequencia);

// Rotas para disciplinas
app.get('/disciplinas', disciplinaController.getDisciplinas);
app.post('/disciplinas', disciplinaController.createDisciplina);

// Rotas para anotações
app.get('/anotacoes/:matricula', anotacaoController.getAnotacoes);
app.post('/anotacoes', anotacaoController.createAnotacao);

// Rotas para notas
app.get('/notas/:matricula/:id_disciplina', notaController.getNotas);
app.post('/notas', notaController.createNota);

// Rotas para alunos_turmas
app.get('/alunos_turmas/:id_turma', alunoTurmaController.getAlunosTurma);
app.post('/alunos_turmas', alunoTurmaController.matricularAluno);

// Configuração de porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});