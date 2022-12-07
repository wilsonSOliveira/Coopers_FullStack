# Projeto Lista To-Do
   * Autor: Wilson Santos de Oliveira
   * Postman: https://documenter.getpostman.com/view/21555870/VUxKTp6h
   * Status: Em produção


 ## Estrutura de dados

* ### Usuários:
    * Id
    * Name
    * Nickname
    * Email

* ### Taferas:
    * Id
    * Title
    * Description
    * Deadline
    * Status : `"To_Do" || "Doing" || "Done" `
    * Author
    * Assignees

    ___

## Criação de tabelas :

``` sql 
CREATE TABLE to_do_list_user(
id VARCHAR (255) PRIMARY KEY ,
name VARCHAR (255) NOT NULL,
nickname VARCHAR (255) NOT NULL UNIQUE,
email varchar (255) NOT NULL UNIQUE
)
```

``` sql
CREATE TABLE to_do_list_tasks(
id VARCHAR(255) PRIMARY KEY,
title varchar(255) NOT NULL,
description VARCHAR(1024)  DEFAULT ("Sem Descriçâo"),
deadline DATE,
status ENUM("Há fazer" , "Fazendo", "Feito") DEFAULT ("Há fazer"),
author_id VARCHAR(255),
FOREIGN KEY (author_id) REFERENCES to_do_list_user(id)
);

```


```sql

CREATE TABLE to_do_list_assigness(
task_id VARCHAR (255) ,
assigness_id VARCHAR(255),
PRIMARY KEY (task_id, assigness_id),
FOREIGN KEY (task_id) REFERENCES to_do_list_tasks(id),
FOREIGN KEY (assigness_id) REFERENCES to_do_list_user(id)
);

```
___


## Endpoints :

* ### Criar usuario :
    * Método POST
    * Path: "/user"
    * Body: 
        * Name (obrigatório)
        * Nickname (obrigatório)
        * Email (obrigatório)

* ### Pegar usuário pelo Id :
    * Método GET
    * Path: "/user/:id"
    * Body de resposta : (Retorna um erro se não encontrar)
        * id 
        * nick

* ### Editar usuario :
    * Método PUT
    * Path: "/user/edit/:id"
    * Body: 
        * Name (opcional, não pode ser vazio)
        * Nickname (opcional, não pode ser vazio)
        * Email (opcional, não pode ser vazio)

* ### Criar tarefas :
    * Método POST
    * Path: "/task"
    * Body: 
        * Title (obrigatório)
        * Deadline (obrigatório, formato `DD/MM/YYYY`)
        * Description 
        * Authorid

* ### Pegar tarefa pelo Id :
    * Método GET
    * Path: "/task/:id"
    * Body: 
        * id
        * Title 
        * Deadline ( formato `DD/MM/YYYY`)
        * Description 
        * Authorid
        * Status
        * Authornickname

* ### Mostrar todos os usuários:
    * Método Get
    * Path: "/users/all"
    * Body de resposta (Retorna um array vazio caso não haja usuários) :
    	* users: [{
		"id": "string",
		"nickname": "string"
        ]}

* ### Pegar tarefas criadas por um usuário:
    * Método: GET
    * Path: /task?creatorUserId=id
    * Body de Resposta:
        * "tasks": [{
		"taskId": "001",
		"title": "Criar banco dos alunos",
		"description": "Devemos criar o banco dos alunos para o módulo do backend",
		"limitDate": "04/05/2020",
		"creatorUserId": "001",
		"status": "to_do",
		"creatorUserNickname": "astrodev"
        }]

    
    






