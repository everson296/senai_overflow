const { Op } = require("sequelize");
const Aluno = require("../models/Aluno");

module.exports = {
    
    //lista todos os alunos
    async listar(req, res){
        const alunos = await Aluno.findAll();
        
        res.send(alunos);
    },
    
    //buscar pelo id
    async buscarPorId(req, res){
        const { id } = req.params;
        
        // professor usou let
        const aluno = await Aluno.findByPk(id, { raw: true }); 
                
        // verifica se o aluno não foi encontrado
        if(!aluno){
            res.status(404).send({ erro: "Aluno não encontrado"});
        }
                        
        delete aluno.senha; 
                
        // retorna o aluno encontrado
        res.send(aluno);
    },

    // metodo para as inserções 
    async store(req, res){
        const { ra, nome, email, senha } = req.body;

        // verificar se aluno ja existe no banco de dados
        // resumindo iremos fazer:
        //select * from alunos where ra = ? or email = ?
        //findOne - metodo para fazer uma busca no banco se achar algo ele manda true ou false
        let aluno = await Aluno.findOne({
            where: {
                [Op.or]: [ {ra: ra}, {email: email} ]
            }
        });
        
        if(aluno){
            return res.status(400).send({ erro: "Aluno já cadastrado" });
        }

        aluno = await Aluno.create({ ra, nome, email, senha });
            
        res.status(201).send(aluno);
    },

    updade() {}, 

    delete() {},

}