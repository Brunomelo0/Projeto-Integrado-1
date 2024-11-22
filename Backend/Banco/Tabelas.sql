CREATE TABLE alunos (
    matricula SERIAL PRIMARY KEY,  -- Chave primária
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    endereco VARCHAR(255),
    email VARCHAR(100),
    telefone VARCHAR(15)
);
CREATE TABLE professores (
    id_professor SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    endereco VARCHAR(255),
    email VARCHAR(100),
    telefone VARCHAR(15)
);
CREATE TABLE turmas (
    id_turma SERIAL PRIMARY KEY,
    nome_turma VARCHAR(100) NOT NULL,
    ano_letivo INT NOT NULL,
    periodo VARCHAR(50) NOT NULL,  -- Ex: "Manhã", "Tarde"
    id_professor_principal INT,
    FOREIGN KEY (id_professor_principal) REFERENCES professores(id_professor)
);
CREATE TABLE disciplinas (
    id_disciplina SERIAL PRIMARY KEY,
    nome_disciplina VARCHAR(100) NOT NULL
);
CREATE TABLE alunos_turmas (
    matricula INT,
    id_turma INT,
    PRIMARY KEY (matricula, id_turma),
    FOREIGN KEY (matricula) REFERENCES alunos(matricula),
    FOREIGN KEY (id_turma) REFERENCES turmas(id_turma)
);
CREATE TABLE aulas (
    id_aula SERIAL PRIMARY KEY,
    id_turma INT,
    id_disciplina INT,
    data DATE NOT NULL,
    horario TIME NOT NULL,
    FOREIGN KEY (id_turma) REFERENCES turmas(id_turma),
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina)
);
CREATE TABLE frequencia (
    id_frequencia SERIAL PRIMARY KEY,
    matricula INT,
    id_aula INT,
    presente BOOLEAN NOT NULL,  -- Presença ou ausência
    FOREIGN KEY (matricula) REFERENCES alunos(matricula),
    FOREIGN KEY (id_aula) REFERENCES aulas(id_aula)
);
CREATE TABLE notas (
    id_nota SERIAL PRIMARY KEY,
    matricula INT,
    id_disciplina INT,
    nota DECIMAL(5, 2),
    FOREIGN KEY (matricula) REFERENCES alunos(matricula),
    FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id_disciplina)
);
CREATE TABLE anotacoes (
    id_anotacao SERIAL PRIMARY KEY,
    id_professor INT,
    matricula INT,
    anotacao TEXT,
    data_anotacao DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (id_professor) REFERENCES professores(id_professor),
    FOREIGN KEY (matricula) REFERENCES alunos(matricula)
);
