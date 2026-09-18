CREATE DATABASE acolher_com_afeto;

USE acolher_com_afeto;

CREATE TABLE formulario_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    mensagem VARCHAR(500) NOT NULL,
    data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE especialidade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

USE acolher_com_afeto;

INSERT INTO especialidade (nome) VALUES
('Psicologia'),
('Fonoaudiologia'),
('Terapia Ocupacional'),
('Psicopedagogia'),
('Neurologia'),
('Psiquiatria'),
('Fisioterapia'),
('Nutrição');

CREATE TABLE modalidade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL UNIQUE
);


INSERT INTO modalidade (nome) VALUES
('Presencial'),
('Online'),
('Híbrido');


CREATE TABLE cadastro_profissional (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    especialidade_id INT NOT NULL,
    registro_profissional VARCHAR(50) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL,
    valor_consulta DECIMAL(10,2) NULL,
    descricao TEXT NULL,
    data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_profissional_especialidade
        FOREIGN KEY (especialidade_id)
        REFERENCES especialidade(id)
);


CREATE TABLE profissional_modalidade (
    profissional_id INT NOT NULL,
    modalidade_id INT NOT NULL,

    PRIMARY KEY (profissional_id, modalidade_id),

    CONSTRAINT fk_profissional_modalidade_profissional
        FOREIGN KEY (profissional_id)
        REFERENCES cadastro_profissional(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_profissional_modalidade_modalidade
        FOREIGN KEY (modalidade_id)
        REFERENCES modalidade(id)
);