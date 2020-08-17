const Aluno = require("../models/Aluno");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = {
  
    async store(req, res){
        const { email, senha } = req.body;
        
        //verificar se o aluno existe e se a senha está correta
        // select * from aluno where email = ? and senha = ?
        const aluno = await Aluno.findOne({
            where: {
                email, 
            }
        });
        
        //se o email estiver errado ou a senha estiver incorreta, retorna erro
        if(!aluno || !bcrypt.compareSync(senha, aluno.senha)){
            res.status(403).send({ erro: "Erro úsuario ou senha invalidos" });
        }
        
        const token = jwt.sign({ alunoId: aluno.id, }, authConfig.secret);
        
        //se existir e a senha estiver correta retorna ok com o token
        res.status(201).send({    
            aluno: { 
                alunoId: aluno.id,
                nome: aluno.nome,
                ra: aluno.ra,
            },
            
            token
        });
    },
}