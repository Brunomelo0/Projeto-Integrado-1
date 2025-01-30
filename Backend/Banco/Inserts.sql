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
('Rafael Santos', '2005-05-05', '11911111111', 'MAT004');
('Rafael Santos', '2005-05-05', '11911111111', 'MAT004');
('Rafael Santos', '2005-05-05', '11911111111', 'MAT004');
('Rafael Santos', '2005-05-05', '11911111111', 'MAT004');


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
('Dificuldade em matemática', 'Em desenvolvimento', 1),
('Ótimo desempenho em ciências', 'Desenvolvido', 2),
('Necessidade de reforço em inglês', 'Em desenvolvimento', 3),
('Progresso positivo em história', 'Desenvolvido', 4);
('Ótimo desempenho em matemática', 'Desenvolvido', 5),
('Necessidade de reforço em biologia', 'Em desenvolvimento', 6),
('Progresso positivo em artes', 'Desenvolvido', 7),
('Dificuldade em física', 'Em desenvolvimento', 8),
('Excelente desempenho em história', 'Desenvolvido', 9);