# Desafio Técnico - Turma XP

# Contexto
Este projeto trata-se de uma aplicação que se assemelha ao dia a
dia da XP, um aplicativo de investimento em ações, com algumas
funcionalidades de conta digital.

## Tomadas de Decisão

- Decidi utilizar o TypeScript para facilitar a detecção de erros durante o desenvolvimento e pelo IntelliSense do VS Code, que reflete maior agilidade e segurança ao escrever o código.

- Adotei a arquitetura de camadas MSC(Model, Service e controller) que ficaram responsaveis por realizar queries no banco de dados, tratamento de regras de negócio e interação com API, respectivamente.

- O banco de dados escolhido foi o MYSQL, realizando a conexão com a camada Model por meio da biblioteca mysql2 do Express.

- Me planejei para pensar bem na API e consegui implementar o requisito bonus do middleware de autenticação com validação do token JWT.

- Procurei utilizar verbos HTTP adequados para cada operação, e corrigi algumas URLs conforme a seção de contratos abaixo no README.

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



## Tecnologias usadas
<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,mysql,typescript,git,javascript," />
  </a>
</p>

> NodeJS, ExpressJS, MYSQL, TypeScript, Git e ES6.

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

<strong>Retorno:</strong><br />
	
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

## 3 - GET BY ASSET (/ativos/{cod-ativo})

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

## 4 - Requisição para depósitos e saques POST (/conta/deposito)

- O endpoint pode é acessado no caminho (`/conta/deposito`) e recebe como entrada o seguinte body:

```json
	{
	    "codCliente": "integer",
	    "valor": "integer",
	}
 ```
 
<details>
<summary><strong>Retorno</strong></summary><br />
 
 * Caso o valor na requisição for negativo ou zero será retornado Status HTTP 400 com a mensagem:
 
 ```json
	{
	     "message": "Quantidade a ser depositada não poderá ser negativa ou igual a zero."
	}
 ```
 * Havendo sucesso na requisição o depósito é adicionada à tabela ordens de depósito, retornando Status HTTP 201 Created e a ordem:
 
 
 ```json
{
    "codCliente": 1,
    "valor": 1000,
    "id": 2
}
```

</details>

## 5 - Requisição para saques POST (/conta/saque)

- O endpoint pode é acessado no caminho (`/conta/saque`) e recebe como entrada o seguinte body:

```json
	{
	    "codCliente": "integer",
	    "valor": "integer",
	}
 ```
 
<details>
<summary><strong>Retorno</strong></summary><br />
 
 * Caso o valor na requisição de saque for negativo, igual a zero, ou maior que a quantidade disponível no saldo será retornado Status HTTP 400 com a mensagem:
 
 ```json
	{
	     "message": "Quantidade a ser sacada não poderá ser maior que o saldo, negativa ou igual a zero."
	}
 ```
 * Havendo sucesso na requisição o depósito é adicionada à tabela ordens de saque, retornando Status HTTP 201 Created e a ordem:
 
 
 ```json
	{
	    "codCliente": 1,
	    "valor": 100,
	    "id": 1
	}
```

</details>

## 6 - Requisição para depósitos e saques GET (/conta/{cod-cliente})

* Endpoint(`/conta/{cod-ativo}`) que recebe como parametro o codigo do cliente cadastrado na corretora.

<details>
<summary><strong>Retorno</strong></summary><br />
	
 * Caso o codigo corresponder a um cliente cadastrado, retorna status 200 OK e o objeto do ativo com o código e saldo disponível na conta deste cliente:

 ```json
	{
	    "codCliente": 1,
	    "saldo": 1000
	}
	    
 ```

</details>

## 7 - Bonus: Requisição para Login do usuário, com autenticação do JWT - JSON Web Token

- O endpoint pode é acessado na URL (`/login`) e recebe como entrada o seguinte body com um middleware de validação:

```json
	{
	    "username": "string",
	    "password": "string",
	}
 ```
 
<details>
<summary><strong>Retorno</strong></summary><br />
 
 * Caso não possua username ou password, retorna Status HTTP 400 e respectivas mensagens:
 
 ```json
	{
	     "message": "\"username\" is required"
	}
 ```
	

 ```json
	{
	    "message": "\"password\" is required"
	}
 ```
	
	
 * Havendo sucesso na requisição, retorna-se o token com Status HTTP 201 Created:
 
 
 ```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoiYWxpY2UifSwiaWF0IjoxNjU4NzExOTg0LCJleHAiOjE2NTg3MTI4ODR9.MgMbDqpCN4a42szDtgWLo3gTxpU0vFPskhGm1E8XA44"
}
```

</details>




 
 
