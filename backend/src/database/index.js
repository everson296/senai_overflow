const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Aluno = require("../models/Aluno");

// criando uma conexão com o banco de dados
const conexao = new Sequelize(dbConfig);

Aluno.init(conexao);

// exportando as conexões 
module.exports = conexao;

//npm run dev