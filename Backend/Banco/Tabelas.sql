CREATE TABLE Diretor (
    ID SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    contato VARCHAR(15),
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE Turma (
    ID SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    periodo VARCHAR(50) NOT NULL
);

CREATE TABLE Professor (
    ID SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    contato VARCHAR(15),
    senha VARCHAR(100) NOT NULL,
    turma_id INT REFERENCES Turma(ID)
);

CREATE TABLE Aluno (
    ID SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    contato VARCHAR(15),
    matricula VARCHAR(20) NOT NULL UNIQUE,
    turma_id INT REFERENCES Turma(ID)
);

CREATE TABLE Diario (
    ID SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    data DATE,
    professor_id INT NOT NULL REFERENCES Professor(ID)
);

CREATE TABLE Frequencia (
    ID SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    turma_id INT NOT NULL REFERENCES Turma(ID),
    aluno_id INT REFERENCES Aluno(ID),
    presenca BOOLEAN NOT NULL DEFAULT FALSE
);


CREATE TABLE Relatorio (
    ID SERIAL PRIMARY KEY,
    arquivo BYTEA,
    data DATE NOT NULL,
    descricao TEXT,
    professor_id INT NOT NULL REFERENCES Professor(ID)
);

CREATE TABLE Diagnostico (
    ID SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    semestre VARCHAR(10),
    aluno_id INT NOT NULL REFERENCES Aluno(ID)
);

CREATE TABLE Aluno_Turma (
    aluno_id INT NOT NULL REFERENCES Aluno(ID),
    turma_id INT NOT NULL REFERENCES Turma(ID),
    PRIMARY KEY (aluno_id, turma_id)
);

CREATE TABLE Professor_Turma (
    professor_id INT NOT NULL REFERENCES Professor(ID),
    turma_id INT NOT NULL REFERENCES Turma(ID),
    PRIMARY KEY (professor_id, turma_id)
);