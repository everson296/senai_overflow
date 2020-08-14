const Postagem = require("../models/Postagem");
const Aluno = require("../models/Aluno");

module.exports = {
    
    async index(req, res){
        const postagens = await Postagem.findAll({
            include: {
                association: "Aluno",
                attributes: ["id", "nome", "ra"],
            },
            order: [["created_at", "DESC"]],
        });
        res.send(postagens);
    },
    
    async store(req, res){
        const token = req.headers.authorization;
        const [Bearer, created_aluno_id] = token.split(" ");
        
        const { titulo, descricao, imagem, gists } = req.body;
        
        try{
            
            const aluno = await Aluno.findByPk(created_aluno_id);
            
            if(!aluno){
                res.status(404).send({ erro: "Aluno não encontrado" });
            }
            
            let postagem = await aluno.createPostagem({
                titulo, 
                descricao, 
                imagem, 
                gists,
            });
            
            res.status(201).send(postagem);
            
        }catch (error) {
            return res.status(500).send({ erro: "Não foi possivel adicionar a postagem, tente novamente" });
        }
        
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
    
    updade() {}, 

    delete() {},
};








































