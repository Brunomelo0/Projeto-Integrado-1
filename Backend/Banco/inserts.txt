-- Inserindo dados na tabela Diretor
INSERT INTO Diretor (nome, contato, senha) VALUES
('João Silva', '123456789', crypt('senha123', gen_salt('bf'))),
('Maria Oliveira', '987654321', crypt('senha456', gen_salt('bf')));

-- Inserindo dados na tabela Professor
INSERT INTO Professor (nome, contato, dataNascimento) VALUES
('Carlos Souza', '123123123', '1980-05-15'),
('Ana Lima', '321321321', '1975-08-22');

-- Inserindo dados na tabela Turma
INSERT INTO Turma (nome, periodo, professor_id) VALUES
('Turma A', 'Matutino', 1),
('Turma B', 'Vespertino', 2);

-- Inserindo dados na tabela Aluno
INSERT INTO Aluno (nome, data_nascimento, contato, matricula, turma_id) VALUES
('Pedro Santos', '2005-03-10', '555555555', '20210001', 1),
('Julia Pereira', '2006-07-25', '666666666', '20210002', 2);

-- Inserindo dados na tabela Diario
INSERT INTO Diario (titulo, descricao, data, professor_id, turma_id) VALUES
('Aula de Matemática', 'Introdução à álgebra', '2025-02-20', 1, 1),
('Aula de História', 'Revolução Francesa', '2025-02-21', 2, 2);

-- Inserindo dados na tabela Frequencia
INSERT INTO Frequencia (data, turma_id, aluno_id, presenca) VALUES
('2025-02-20', 1, 1, TRUE),
('2025-02-21', 2, 2, FALSE);

-- Inserindo dados na tabela Relatorio
INSERT INTO Relatorio (arquivo, data, descricao, professor_id, turma_id) VALUES
(E'\\xDEADBEEF', '2025-02-22', 'Relatório de desempenho', 1, 1),
(E'\\xCAFEBABE', '2025-02-23', 'Relatório de atividades', 2, 2);

-- Inserindo dados na tabela Diagnostico
INSERT INTO Diagnostico (descricao, status, semestre, aluno_id) VALUES
('Dificuldade em matemática', 'Em andamento', '2025-1', 1),
('Excelente desempenho em história', 'Concluído', '2025-1', 2);

-- Inserindo dados na tabela Aluno_Turma
INSERT INTO Aluno_Turma (aluno_id, turma_id) VALUES
(1, 1),
(2, 2);

-- Inserindo dados na tabela Professor_Turma
INSERT INTO Professor_Turma (professor_id, turma_id) VALUES
(1, 1),
(2, 2);

-- Inserindo dados na tabela Users
INSERT INTO Users (username, password, role, image) VALUES
('admin', crypt('admin123', gen_salt('bf')), 'admin', E'\\x'),
('professor1', crypt('prof123', gen_salt('bf')), 'professor', E'\\x');