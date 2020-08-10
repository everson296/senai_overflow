const Postagem = require("../models/Postagem");

module.exports = {
    async store(req, res){
        const token = req.headers.authorization;
        const [Bearer, created_aluno_id] = token.split(" ");
        
        const { titulo, descricao, imagem, gists } = req.body;
        
        let post = await Postagem.create({
            titulo, 
            descricao, 
            imagem, 
            gists,
            created_aluno_id,
        });
        
        res.status(201).send(post);
        
    },
    
    async delete(req, res){
        // pegando o id do aluno que esta logado
        const token = req.headers.authorization;
        const [Bearer, created_aluno_id] = token.split(" ");
        
        // pegando o id do posta apagar
        const { id } = req.params;
        
        // procura o post pelo id
        let postagem = await Postagem.findByPk(id);
        
        //se a postagem não existir retorna not found
        if(!postagem){
            return res.status(404).send({ erro: "Postagem não encontrada" });
        }
        
        // se aluno logado for diferente do aluno que criou a postagem este alun não pode apagar a postagem
        if(postagem.created_aluno_id != created_aluno_id){
            return res.status(401).send({ erro: "Você não tem permissão de excluir esta postagem" });
        }
        
        await postagem.destroy();
        res.status(204).send();
    },
};