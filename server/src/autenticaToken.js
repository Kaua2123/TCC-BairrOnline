const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});



function autenticaJWT(req, res, next){
    const token = req.headers.authorization;

    if(!token) {
        console.error('Token não fornecido');
        return res.status(400).json({ mensagem: 'Token não fornecido' });
    }

    console.log('Testando autenticação com token...');

    jwt.verify(token, process.env.CHAVE_JWT, (error, decoded) => {
        if (error) {
            console.error('Token inválido:', error.message);
            return res.status(400).json({ mensagem: 'Token inválido' });
        }
        req.usuario = decoded;
        next();
    })
}

module.exports = autenticaJWT;