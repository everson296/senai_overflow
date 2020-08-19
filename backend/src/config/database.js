//timestamp coloca created_at e update_at nas tabelas
// underscored coloca os nomes de tabelas e atribuutos como snake_case
module.exports = {
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "bcd147",
    database: "senai_overflow",
    logging: console.log,
    define:{
        timestamp: true,
        underscored: true,
    },
};