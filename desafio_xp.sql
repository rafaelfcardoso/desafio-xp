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
    codCliente INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    codAtivo INT NOT NULL,
    qtdeAtivo INT NOT NULL,
    FOREIGN KEY (codCliente) REFERENCES desafio_xp.pessoa_cliente (codCliente)
) ENGINE=INNODB;

CREATE TABLE ativos_corretora (
    codAtivo INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    ticker VARCHAR(5) NOT NULL,
    qtdeAtivo INTEGER NOT NULL,
    valor DOUBLE NOT NULL
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
  desafio_xp.ativos_corretora (codAtivo, ticker, qtdeAtivo, valor)
VALUES
  (1, "PETR4", 1000000, 29.18);
  
INSERT INTO
  desafio_xp.ativos_corretora (codAtivo, ticker, qtdeAtivo, valor)
VALUES
  (2, "VALE3", 50000, 68.88);
  
INSERT INTO
  desafio_xp.ativos_corretora (codAtivo, ticker, qtdeAtivo, valor)
VALUES
  (3, "ABEV3", 2500000, 14.48);
  
INSERT INTO
  desafio_xp.ativos_corretora (codAtivo, ticker, qtdeAtivo, valor)
VALUES
  (4, "ITUB4", 100000, 23.62);
  
INSERT INTO
  desafio_xp.ativos_corretora (codAtivo, ticker, qtdeAtivo, valor)
VALUES
  (5, "BBDC3", 500000, 14.33);
  
