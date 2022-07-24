# Desafio Técnico - Turma XP

# Contexto
Este projeto trata-se de uma aplicação que se assemelha ao dia a
dia da XP, um aplicativo de investimento em ações, com algumas
funcionalidades de conta digital.

## Técnologias usadas

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, MYSQL e TypeScript.


## Instalando Dependências

> Backend
```bash
cd desafio-xp/ 
npm install
``` 

  ⚠️ **Importante:** Para rodar o projeto é necessário ter o `node` instalado em seu computador.

## Executando aplicação

* Para rodar o back-end:

  ```
  cd desafio-xp/ && npm run dev
  ```


## Executando Testes

* Para rodar todos os testes:

  ```
    npm test
  ```
  
  
  </details>

<details>
  <summary><strong>🪑 Tabelas</strong></summary><br />

  O banco possui sete tabelas: pessoas clientes, ativos-corretora, ativos-cliente, ordens de compra, ordens de venda, depositos e saques.

  ```sql
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
  ```

  O arquivo `desafio_xp.sql` contém as _queries_ que criam e populam o banco.


</details>


<details>
  <summary><strong>🛠 Testes</strong></summary><br />

  Para executar os testes localmente, digite no terminal o comando `npm test`, ou para executar apenas um teste você pode usar `npm test 01`.

</details>

# Contratos
## 1 - POST (/investimentos/comprar)

- O endpoint pode ser acessado através do caminho (`/investimentos/comprar`) e recebe como entrada o seguinte body:

```json
	{
	    "codCliente": "integer",
	    "codAtivo": "integer",
	    "qtdeAtivo": "integer",
	}
 ```
 
<details>
<summary><strong>Retorno</strong></summary><br />
 
 * Caso a quantidade de ativos deja maior que a disponível na corretora será retornado o seguinte JSON com Status HTTP 400:
 
 ```json
	{
	     "message": "Quantidade indisponível na Corretora!"
	}
 ```
 * Havendo sucesso na requisição a ordem é adicionada à tabela ordens de compra, e a quantia de ativos comprada é atualizada em ativos-cliente retornando Status HTTP 201 Created e a ordem:
 
 
 ```json
 {
    "codCliente": 1,
    "codAtivo": 3,
    "qtdeAtivo": 300,
    "id": 0
}
```

</details>



 
 
