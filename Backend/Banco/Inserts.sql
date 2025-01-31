INSERT INTO Diretor (nome, contato, senha) VALUES
('João da Silva', '11999999999', 'senha123'),
('Maria Oliveira', '21988888888', 'senha456');


INSERT INTO Professor (nome, contato, senha) VALUES
('Carlos Mendes', '11955555555', 'senha789'),
('Ana Souza', '31977777777', 'senha101'),
('Pedro Costa', '21966666666', 'senha202');


INSERT INTO Aluno (nome, data_nascimento, contato, matricula) VALUES
('Lucas Pereira', '2005-03-12', '11944444444', 'MAT001'),
('Fernanda Lima', '2004-07-21', '21933333333', 'MAT002'),
('Mariana Silva', '2006-11-15', '31922222222', 'MAT003'),
('Rafael Santos', '2005-05-05', '11911111111', 'MAT004'),
('Ana Paula', '2005-08-10', '11955555555', 'MAT005'),
('Carlos Eduardo', '2004-02-20', '21966666666', 'MAT006'),
('Beatriz Souza', '2006-09-25', '31977777777', 'MAT007'),
('João Pedro', '2005-12-30', '11988888888', 'MAT008'),
('Larissa Oliveira', '2004-04-14', '21999999999', 'MAT009'),
('Gabriel Costa', '2006-06-18', '31910101010', 'MAT010'),
('Juliana Mendes', '2005-01-22', '11911111112', 'MAT011'),
('Felipe Rocha', '2004-03-15', '21912121212', 'MAT012'),
('Camila Ferreira', '2006-07-19', '31913131313', 'MAT013'),
('Thiago Almeida', '2005-11-23', '11914141414', 'MAT014'),
('Patrícia Gomes', '2004-05-27', '21915151515', 'MAT015'),
('Rodrigo Martins', '2006-08-31', '31916161616', 'MAT016'),
('Vanessa Ribeiro', '2005-02-05', '11917171717', 'MAT017'),
('Bruno Silva', '2004-06-09', '21918181818', 'MAT018'),
('Isabela Santos', '2006-10-13', '31919191919', 'MAT019'),
('Renato Carvalho', '2005-03-17', '11920202020', 'MAT020');


INSERT INTO Turma (nome, periodo) VALUES
('Turma A', 'Manhã'),
('Turma B', 'Tarde'),
('Turma C', 'Noite');


INSERT INTO Aluno_Turma (aluno_id, turma_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3);


INSERT INTO Professor_Turma (professor_id, turma_id) VALUES
(1, 1),
(2, 2),
(3, 3);


INSERT INTO Diario (titulo, descricao, professor_id) VALUES
('Planejamento Semanal', 'Planejamento das atividades da semana', 1),
('Acompanhamento de Projetos', 'Registro dos projetos em andamento', 2);


INSERT INTO Frequencia (data, porcentagem, turma_id) VALUES
('2024-12-01', 90.5, 1),
('2024-12-02', 85.0, 2),
('2024-12-03', 92.0, 3);


INSERT INTO Relatorio (arquivo, data, descricao, professor_id) VALUES
(DECODE('68656c6c6f', 'hex'), '2024-12-01', 'Relatório de desempenho da Turma A', 1),
(DECODE('776f726c64', 'hex'), '2024-12-02', 'Relatório de frequência da Turma B', 2);


INSERT INTO Diagnostico (descricao, status, aluno_id) VALUES
('Dificuldade em matemática', 'Em desenvolvimento', '1'),
('Ótimo desempenho em ciências', 'Desenvolvido', '2'),
('Necessidade de reforço em inglês', 'Em desenvolvimento', '3'),
('Progresso positivo em história', 'Desenvolvido', '4');
