const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
    
    const { authorization } = req.headers;
 
    if(!authorization)
        res.status(401).send({ erro: "Token não informardo" });
    
    
    const [Bearer, token] = authorization.split(" ");
    
    if(!token)
       res.status(401).send({ erro: "Token mal formadatado" });
    
    try{
        const retorno = jwt.verify(token, authConfig.secret);
        
        req.alunoId = retorno.alunoId;
        
        return next();
    }catch(erro){
        res.status(401).send({ erro: "Token invalido" });
    }
}