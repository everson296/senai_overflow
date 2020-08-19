const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Aluno = require("../models/Alunos");
const Postagem = require("../models/Postagem");
const Comentario = require("../models/Comentario");

//criamos a conexão com os dados da configuração 
const conexao = new Sequelize(dbConfig);

Aluno.init(conexao);
Postagem.init(conexao);
Comentario.init(conexao);

//inicializando as associações 
Aluno.associate(conexao.models);
Postagem.associate(conexao.models);
Comentario.associate(conexao.models);

//exportamos a conexao 
module.exports = conexao;