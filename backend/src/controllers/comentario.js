const Comentario = require("../models/Comentario");
const Aluno = require("../models/Aluno");
const Postagem = require("../models/Postagem");

module.exports = {
    
    //implementar listagem de comentarios
    async index(req, res){
        // recuperando o id da requisição
        const { postId } = req.params;
        
        const postagem = await Postagem.findByPk(postId);
        
        if(!postagem){
            return res.status(404).send({ erro: "Postagem não encontrada" });
        }
        
        const comentarios = await postagem.getComentarios({
            include: {
                association: "Aluno",
                attributes: ["id", "nome"],
            },
            
            attributes: ["id", "descricao"],
            order: [["created_at", "ASC"]],
        });
        
        res.send(comentarios);
    },
    
    //implementar inserção de comentarios
    async store(req, res){
        // recuperando o id do aluno
        const token = req.headers.authorization;
        const [Bearer, alunoId] = token.split(" ");
        
        //recuperando o id da url
        const { postId } = req.params;
        
        //recuperando o testo da descrição
        const { descricao } = req.body;
                        
        // procurando a postagem por id
        const postagem = await Postagem.findByPk(postId);
        
        if (!postagem) {
            return res.status(404).send({ erro: "postagem não encontrada" });
        }
            
        // criar um comentario 
        // passando a descrição e o id do aluno
        let comentario = await postagem.createComentario({
            descricao,
            aluno_id: alunoId,
        });
        
        // formatando o retorno
        comentario = comentario.dataValues;
        comentario.postagem_id = comentario.PostagemId;
        delete comentario.PostagemId;        
        delete comentario.AlunoId;        
        
        res.status(201).send(comentario);
    },
    
    updade() {}, 

    delete() {},
};

      
    
    
    

    
  
  




///postagens/:postId/comentarios