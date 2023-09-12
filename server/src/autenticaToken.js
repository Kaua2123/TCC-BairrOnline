const jwt = require('jsonwebtoken');

function autenticaJWT(req, res, next){
    const token = req.headers.authorization;

    if(!token) {
        return res.status(400).json({ msg: 'token não fornecido.'})
    }

    jwt.verify(token, process.env.CHAVE_JWT, (error, decoded) => {
        if (error) {
            return res.status(400).json({ msg: 'Token inválido'})
        }
        req.usuario = decoded;
        next();
    });
}

module.exports = autenticaJWT;