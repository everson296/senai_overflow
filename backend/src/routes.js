// este arquivo tem como responsabilidade cadastrar as rotas da aplicação

const express = require("express");
const { route } = require("./app");

//criando o roterizador
const routes = express.Router();

const alunoController = require("./controllers/aluno");
const postagemController = require("./controllers/postagem");

//rotas para usuarios
routes.get("/alunos", alunoController.listar);
routes.get("/alunos/:id", alunoController.buscarPorId);
routes.post("/alunos", alunoController.store);

//rotas para postagens
routes.post("/postagens", postagemController.store);
routes.delete("/postagens/:id", postagemController.delete);

module.exports = routes;