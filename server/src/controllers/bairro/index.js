const knex = require('../../database/banco')

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
            const { bai_cod } = req.params;
            const { bai_nome } = req.params;
            await knex('bairro').insert({

                bai_cod,
                bai_nome
                
            })
            return res.status(201).send("BAIRRO BUSCADO")

        } catch (error) {
            console.log(error);
            return res.status(400).json({error: error.message});
        }
    }
}