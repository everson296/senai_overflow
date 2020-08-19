const express = require('express');
const rotas = require("./routes");
require("./database");
//iniciando a aplicacao
const app = express();

//nas requisições pode ter corpos no formato json
app.use(express.json());

app.use(rotas);

module.exports = app;