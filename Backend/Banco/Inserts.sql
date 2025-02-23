-- Inserir novos usuários na tabela Users
INSERT INTO Users (username, password, role, image) VALUES
('admin', crypt('admin123', gen_salt('bf')), 'diretor', NULL),
('profA', crypt('senha123', gen_salt('bf')), 'professor', NULL),
('profB', crypt('senha456', gen_salt('bf')), 'professor', NULL),
('profC', crypt('senha789', gen_salt('bf')), 'professor', NULL);

-- Inserir dados na tabela Diretor
INSERT INTO Diretor (nome, contato, senha) VALUES
('João da Silva', '11999999999', crypt('senha123', gen_salt('bf'))),
('Maria Oliveira', '21988888888', crypt('senha456', gen_salt('bf')));

-- Inserir dados na tabela Professor
INSERT INTO Professor (nome, contato, dataNascimento) VALUES
  ('Professor A', '123456789', '1980-01-01'),
  ('Professor B', '987654321', '1985-02-02'),
  ('Professor C', '555444333', '1990-03-03');

-- Inserir dados na tabela Aluno
INSERT INTO Aluno (nome, data_nascimento, contato, matricula, turma_id) VALUES
('Lucas Pereira', '2005-03-12', '11944444444', 'MAT001'),(1),
('Fernanda Lima', '2004-07-21', '21933333333', 'MAT002'),(1),
('Mariana Silva', '2006-11-15', '31922222222', 'MAT003'),(1),
('Rafael Santos', '2005-05-05', '11911111111', 'MAT004'),(1),
('Ana Paula', '2005-08-10', '11955555555', 'MAT005'),(2),
('Carlos Eduardo', '2004-02-20', '21966666666', 'MAT006'),(1),
('Beatriz Souza', '2006-09-25', '31977777777', 'MAT007'),(1),
('João Pedro', '2005-12-30', '11988888888', 'MAT008'),(1),
('Larissa Oliveira', '2004-04-14', '21999999999', 'MAT009'),
('Gabriel Costa', '2006-06-18', '31910101010', 'MAT010'),(2),
('Juliana Mendes', '2005-01-22', '11911111112', 'MAT011'),(2),
('Felipe Rocha', '2004-03-15', '21912121212', 'MAT012'),(2),
('Camila Ferreira', '2006-07-19', '31913131313', 'MAT013'),(2),
('Thiago Almeida', '2005-11-23', '11914141414', 'MAT014'),(2),
('Patrícia Gomes', '2004-05-27', '21915151515', 'MAT015'),(3),
('Rodrigo Martins', '2006-08-31', '31916161616', 'MAT016'),(3),
('Vanessa Ribeiro', '2005-02-05', '11917171717', 'MAT017'),(3),
('Bruno Silva', '2004-06-09', '21918181818', 'MAT018'),(3),
('Isabela Santos', '2006-10-13', '31919191919', 'MAT019'),(3),
('Renato Carvalho', '2005-03-17', '11920202020', 'MAT020'),(3);

-- Inserir dados na tabela Turma
INSERT INTO Turma (nome, periodo, professor_id) VALUES
('Turma A', 'Matutino', 1),
('Turma B', 'Vespertino', 2),
('Turma C', 'Noturno', 3);

-- Inserir dados na tabela Aluno_Turma
INSERT INTO Aluno_Turma (aluno_id, turma_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3);

-- Inserir dados na tabela Professor_Turma
INSERT INTO Professor_Turma (professor_id, turma_id) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Inserir dados na tabela Diario
INSERT INTO Diario (titulo, descricao, data, professor_id, turma_id) VALUES
('Planejamento Semanal', 'Planejamento das atividades da semana', '2024-12-01', 1,1),
('Acompanhamento de Projetos', 'Registro dos projetos em andamento', '2024-12-02', 2,2);

-- Inserir dados na tabela Frequencia
INSERT INTO Frequencia (data, turma_id, aluno_id, presenca) VALUES
('2024-12-01', 1, 1, TRUE),
('2024-12-02', 2, 2, TRUE),
('2024-12-03', 3, 3, TRUE);

-- Inserir dados na tabela Relatorio
INSERT INTO Relatorio (arquivo, data, descricao, professor_id, turma_id) VALUES
(DECODE('68656c6c6f', 'hex'), '2024-12-01', 'Relatório de desempenho da Turma A', 1, 1),
(DECODE('776f726c64', 'hex'), '2024-12-02', 'Relatório de frequência da Turma B', 2, 2);

-- Inserir dados na tabela Diagnostico
INSERT INTO Diagnostico (descricao, status, semestre, aluno_id) VALUES
('Dificuldade em matemática', 'Em desenvolvimento', '2024/1', 1),
('Ótimo desempenho em ciências', 'Desenvolvido', '2024/1', 2),
('Necessidade de reforço em inglês', 'Em desenvolvimento', '2024/1', 3),
('Progresso positivo em história', 'Desenvolvido', '2024/1', 4);
