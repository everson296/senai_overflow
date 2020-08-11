const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Aluno = require("../models/Aluno");
const Postagem = require("../models/Postagem");
const Comentario = require("../models/Comentario");

// criando uma conexão com o banco de dados
const conexao = new Sequelize(dbConfig);

// inicializando os modos
Aluno.init(conexao);
Postagem.init(conexao);
Comentario.init(conexao);

//inicializando as associações
Aluno.associate(conexao.models);
Postagem.associate(conexao.models);
Comentario.associate(conexao.models);

// exportando as conexões 
module.exports = conexao;

//npm run dev