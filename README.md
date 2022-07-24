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

## 2 - GET BY CLIENT(/ativos/{cod-cliente})

* Esta rota teve o caminho `/cliente` adicionado para não haver conflito com a rota Get By Asset dos ativos da corretora;
* Endpoint(`/ativos/cliente/{cod-cliente}`) que recebe como parametro o codigo do cliente cadastrado.
* Implementei esta rota para que fosse capaz de enviar os ativos sob custódia de cada cliente para o Front-end.

<details>
<summary><strong>Retorno</strong></summary><br />
	
 * Caso o cod-cliente estiver cadastrado e com ativos sob custódia ela retorna status 200 OK com a lista dos ativos com os dados codigo do cliente, código do ativo, quantidade investida e valor unitario do ativo, respectivamente:

 ```json
	[
	    {
		"codCliente": 1,
		"codAtivo": 4,
		"qtdeAtivo": 4000,
		"valor": 23.62
	    },
	    {
		"codCliente": 1,
		"codAtivo": 5,
		"qtdeAtivo": 5000,
		"valor": 14.33
	    },
	    {
		"codCliente": 1,
		"codAtivo": 2,
		"qtdeAtivo": 3000,
		"valor": 68.88
	    },
	    {
		"codCliente": 1,
		"codAtivo": 1,
		"qtdeAtivo": 500,
		"valor": 29.18
	    },
	    {
		"codCliente": 1,
		"codAtivo": 3,
		"qtdeAtivo": 300,
		"valor": 14.48
	    }
	]
 ```

</details>

## 3 - GET BY ASSETS (/ativos/{cod-ativo})

* Endpoint(`/ativos/{cod-ativo}`) que recebe como parametro o codigo do ativo cadastrado na tabela.

<details>
<summary><strong>Retorno</strong></summary><br />
	
 * Caso o cod-ativo corresponder aos ativos disponíveis retorna status 200 OK e o objeto do ativo com o código, quantidade disponível para compra e valor unitario, respectivamente:

 ```json
	{
	    "codAtivo": 5,
	    "qtdeAtivo": 5000000,
	    "valor": 14.33
	}
	    
 ```

</details>



 
 
