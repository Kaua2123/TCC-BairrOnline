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
            // const { bai_cod } = req.body;
            const { bai_nome } = req.body;

            const existingBairro = await knex('bairro').where('bai_nome', bai_nome).first();

            if (existingBairro) {
                return res.status(200).json({message: 'Bairro existente.'})
            }
            
            await knex('bairro').insert({

                // bai_cod, n precisa de codigo pq ta com auto increment agr
                bai_nome
                
                
            });
         
        return res.status(201).json({message: 'Bairro buscado.'})
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: error.message});
        }
    }
}   