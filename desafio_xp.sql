DROP DATABASE IF EXISTS desafio_xp;

CREATE DATABASE desafio_xp;

USE desafio_xp;

CREATE TABLE pessoa_cliente (
    codCliente INTEGER PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    saldo DOUBLE NOT NULL
) ENGINE=INNODB;

CREATE TABLE ordens_de_compra (
    codCliente INTEGER NOT NULL,
    codAtivo INT NOT NULL,
    qtdeAtivo INT NOT NULL
) ENGINE=INNODB;

CREATE TABLE ordens_de_venda (
	id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    codCliente INTEGER NOT NULL,
    codAtivo INT NOT NULL,
    qtdeAtivo INT NOT NULL
) ENGINE=INNODB;

CREATE TABLE depositos (
	id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    codCliente INTEGER NOT NULL,
    valor DOUBLE NOT NULL
) ENGINE=INNODB;

CREATE TABLE saques (
	id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    codCliente INTEGER NOT NULL,
    valor DOUBLE NOT NULL
) ENGINE=INNODB;

CREATE TABLE ativos_corretora (
    codAtivo INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    ticker VARCHAR(5) NOT NULL,
    qtdeAtivo INTEGER NOT NULL,
    valor DOUBLE NOT NULL
) ENGINE=INNODB;

CREATE TABLE ativos_cliente (
	id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    codCliente INTEGER NOT NULL,
    codAtivo INTEGER NOT NULL,
    qtdeAtivo INTEGER NOT NULL,
    valor DOUBLE NOT NULL
) ENGINE=INNODB;

INSERT INTO
  desafio_xp.pessoa_cliente (codCliente, username, password, saldo)
VALUES
  (1, 'bob','senha1', 1000);
  
  INSERT INTO
  desafio_xp.pessoa_cliente (codCliente, username, password, saldo)
VALUES
  (2, 'alice','senha2', 1000);

INSERT INTO
  desafio_xp.ativos_cliente (codCliente, codAtivo, qtdeAtivo, valor)
VALUES
  (3, 2, 10000, 29.18);
  
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
  
