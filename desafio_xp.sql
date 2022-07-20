DROP DATABASE IF EXISTS desafio_xp;

CREATE DATABASE desafio_xp;

USE desafio_xp;

CREATE TABLE pessoa_cliente (
    codCliente INTEGER PRIMARY KEY NOT NULL,
    saldo DOUBLE NOT NULL
) ENGINE=INNODB;

CREATE TABLE autenticacao_cliente (
    codCliente INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(20) NOT NULL,
    FOREIGN KEY (CodCliente) REFERENCES desafio_xp.pessoa_cliente (codCliente)
) ENGINE=INNODB;

CREATE TABLE ordens (
    codCliente INTEGER PRIMARY KEY NOT NULL,
    codAtivo INT NOT NULL,
    qtdeAtivo INT NOT NULL
) ENGINE=INNODB;

CREATE TABLE ativos (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    codAtivo VARCHAR(50) NOT NULL,
    qtdeAtivo INT NOT NULL,
    valor DOUBLE
) ENGINE=INNODB;

INSERT INTO
  desafio_xp.pessoa_cliente (codCliente, saldo)
VALUES
  (1, 1000.00);
  
INSERT INTO
  desafio_xp.ordens (codCliente, codAtivo, qtdeAtivo)
VALUES
  (1, 1, 100);
  
INSERT INTO
  desafio_xp.ordens (codCliente, codAtivo, qtdeAtivo)
VALUES
  (2, 2, 1000);
