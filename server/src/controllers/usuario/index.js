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
            const { usu_nome } = req.body;
            const { usu_email } = req.body;
            await knex('usuario').insert({

                nomeTESTE,
                emailTESTE
            });
            return res.status(201).send("REGISTRO CRIADO VÊ LÁ CARAI")
            console.log(usu_nome, usu_email);

        } catch (error) {
            return res.status(400).json({error: error.message});
            console.log(error);
        }
    },

}