const Comentario = require("../models/Comentario");
const Postagem = require("../models/Postagem");

module.exports={
   //Implementar a listagem de comentarios
    async index(req,res){
        const { postId } = req.params;

       const postagem = await Postagem.findByPk(postId);
       if(!postagem){
        return res.status(404).send({erro: "Postagem não encontrada"});
       }
       const comentarios = await postagem.getComentarios({
        include:{
            association: "Aluno",
            attributes:["id", "nome"],
        },  
        attributes:["id", "descricao"],
       });

       res.send(comentarios);
    },
    //Implementar a inserção de comentarios
    async store(req, res) {
        //recuperar o id do aluno
        const alunoId = req.alunoId;
        //recuperar o id da postagem
        const { postId } = req.params;
        //recuperar a descricao do comentario
        const { descricao } = req.body;
        console.log(req.body)
        //procurar a postagem pelo id
        const postagem = await Postagem.findByPk(postId);

        //se não existir, retornar erro
        if (!postagem) {
          return res.status(404).send({ erro: "Postagem não encontrada" });
        }
        //criar o comentário usando o createComentario
        //passando o id do aluno e a descricao
        let comentario = await postagem.createComentario({
          descricao,
          aluno_id: alunoId,
        });

        comentario = comentario.dataValues;
        comentario.postagem_id = comentario.PostagemId;

        delete comentario.PostagemId;
        delete comentario.AlunoId;
        //responder com status de criado com sucesso
        res.status(201).send(comentario);
      },
}