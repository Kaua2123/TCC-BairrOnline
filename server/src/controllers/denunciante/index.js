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

    async usuDenunciante(req, res){ //mudar o nome dps
        try {
            
            const { usuario_usu_cod } = req.body;

            await knex ('denunciante').insert({

                usuario_usu_cod

            });

            axios.post('http://localhost:3344/criarDenunciante', {
                usuario_usu_cod
            }).then((response) => {
                console.log(response.data);
                return res.status(201).send('DENUNCIANTE CRIADO');
            }).catch ((error) => {
                console.error(error);
                return res.status(500).json({error: error.message});
            })

        return res.status(201).json({message: 'Denunciante criado.'})
        } catch (error) {
            console.log(error)
            return res.status(400).json({error: error.message});
        }
    }

}