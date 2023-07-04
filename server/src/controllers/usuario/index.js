const knex = require('../../database/banco');

module.exports = {
    async raiz(req, res){
        try {
            return res.send("pagina raiz");
        } catch (error) {
            return res.status(400).json({error: error.message});
        }   
    },

    async testeCriarUsuario(req, res){
        try {
            const { usu_cod } = req.body;
            const { usu_nome } = req.body;
            const { usu_email } = req.body;
            const { usu_senha } = req.body;
            const { usu_tel } = req.body;
            await knex('usuario').insert({
                
                usu_cod,
                usu_nome,
                usu_email,
                usu_senha,
                usu_tel
            });
            console.log(usu_cod, usu_nome, usu_email, usu_senha, usu_tel);
            return res.status(201).send("REGISTRO CRIADO xd");

        } catch (error) {
            console.log(error);
            return res.status(400).json({error: error.message});
          
        }
    },

}