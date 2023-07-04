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

    async criarDenuncia(req, res){
        try {
            const { den_cod }  = req.body;
            const { den_nome } = req.body;
            const { den_prazo } = req.body;
            const { den_desc } = req.body; 
            const { bairro_bai_cod } = req.body;

            const bairroExists = await knex('bairro').where('bai_cod', bairro_bai_cod).first();

            if(!bairroExists){
                return res.status(400).json({error: 'Valor inválido para bairro_bai_cod'});
            }

            await knex('denuncias').insert({

                den_cod,
                den_nome,
                den_prazo,
                den_desc,
                bairro_bai_cod
        


            });
            axios.post('http://localhost:3344/criarDenuncia', {
                den_cod, 
                den_nome,
                den_prazo,
                den_desc
            }).then((response) => {
                console.log(response.data);
                return res.status(201).send("DENUNCIA CRIADA");
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