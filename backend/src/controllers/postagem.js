const Postagem = require("../models/Postagem");
const Aluno = require("../models/Alunos");

module.exports = {

    async index(req, res ){
        const postagens = await Postagem.findAll({
            include:{
                association: "Aluno",
                attributes:["id","nome","ra",]
            },
            order:[["created_at", "DESC"]]
        });
        res.send(postagens);
    },
    async store(req,res){
        //pegar id do aluno logado
        const created_aluno_id = req.alunoId;
        
        const { titulo, descricao, imagem, gists } = req.body;

        try {
            const aluno = await Aluno.findByPk(created_aluno_id);
            if(!aluno){
                res.status(404).send({erro: "Aluno não encontrado"})
            }
            let postagem = await aluno.createPostagem({  
                titulo, 
                descricao, 
                imagem, 
                gists, 
            });

            res.status(201).send(postagem); 
        } catch (error) {
            return res.status(500).send({erro:"Não foi possivel adicionar a postagem, tente mais tarde"})
        }
    },
    async delete(req,res){
        //pegando o id do aluno que esta logado 
        const created_aluno_id = req.alunoId;

        //pegando o id a ser apagado
        const {id} = req.params;
        //procura o post pelo id
        let postagem = await Postagem.findByPk(id);
        // se a postagem nao existir retorna not found
        if(!postagem){
            return res.status(404).send({erro: "Postagem não encontrada"});
        }
        //Se o aluno logado for diferente do aliuno que criou a postagem retorna nao autotizado
        if(postagem.created_aluno_id != created_aluno_id){
            return res.status(401).send({erro:"Você não tem permissão para essa ação"});
        }
        await postagem.destroy();
        res.status(204).send();
    },
}