// este arquivo tem como responsabilidade cadastrar as rotas da aplicação

const express = require("express");
const { route } = require("./app");

//criando o roterizador
const routes = express.Router();

const alunoController = require("./controllers/aluno");
const postagemController = require("./controllers/postagem");
const comentarioController = require("./controller/comentario");

//rotas para usuarios
routes.get("/alunos", alunoController.listar);
routes.get("/alunos/:id", alunoController.buscarPorId);
routes.post("/alunos", alunoController.store);

//rotas para postagens
routes.get("/postagens", postagemController.index);
routes.post("/postagens", postagemController.store);
routes.delete("/postagens/:id", postagemController.delete);

//rotas para comentarios
routes.post("/postagens/:postId/comentarios", comentarioController.store);

module.exports = routes;