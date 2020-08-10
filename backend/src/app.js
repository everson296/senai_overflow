const express = require('express');
const rotas = require('./routes');
require("./database");

// iniciando a palicação
const app = express();

// nas requisições pode ter conteudo no formarto de json
app.use(express.json());

// cadastrando as rotas
app.use(rotas);

module.exports = app;