const knex = require('../../database/banco');
const axios = require('axios');

module.exports = {
    async raiz(req, res){
        try {
            return res.send("pagina raiz");
        } catch (error) {
            return res.status(400).json({error: error.message});
        }   
    },

    async CriarUsuario(req, res){
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
            axios.post('http://localhost:3344/criarUsu', {
                usu_cod,
                usu_nome,
                usu_email,
                usu_senha,
                usu_tel
        }).then((response) => {
                console.log(response.data);
                return res.status(201).send("USUARIO CRIADO");
        }).catch((error) => {

            if(error.response) {
                console.error("Server respondeu com:", error.response.data);
            }
            return res.status(500).json({error: error.message});
        });
        
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: error.message});
          
        }
    },

}