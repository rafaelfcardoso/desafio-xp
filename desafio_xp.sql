DROP DATABASE IF EXISTS desafio_xp;

CREATE DATABASE desafio_xp;

USE desafio_xp;

CREATE TABLE pessoa_cliente (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(20) NOT NULL
) ENGINE=INNODB;

CREATE TABLE ordem (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    CodCliente INT NOT NULL,
    CodAtivo VARCHAR(100) NOT NULL,
    QtdeAtivo INT NOT NULL,
    Valor DOUBLE,
    FOREIGN KEY (CodCliente) REFERENCES desafio_xp.pessoa_cliente (id)
) ENGINE=INNODB;

INSERT INTO
  desafio_xp.pessoa_cliente (email, password)
VALUES
  ("rafael.fcardoso@hotmail.com", "1234");
