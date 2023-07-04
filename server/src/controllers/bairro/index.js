const knex = require('../../database/banco')
const axios = require('axios');

module.exports = {
    async raiz(req, res){
        try {
            return res.send("pagina raiz");
        } catch (error) {
            return res.status(400).json({error: error.message});
        }   
    },

    async buscarBairro(req, res){
        try {
            const { bai_cod } = req.body;
            const { bai_nome } = req.body;
            await knex('bairro').insert({

                bai_cod,
                bai_nome
                
            });
            axios.post('http://localhost:3344/buscarBairro', {
                bai_cod,
                bai_nome
            }).then((response) => {
                console.log(response.data);
                return res.status(201).send("BAIRRO BUSCADO");
            }).catch((error) => {
                console.error(error);
                return res.status(500).json({error: error.message});
            });
            

        } catch (error) {
            console.log(error);
            return res.status(400).json({error: error.message});
        }
    }
}