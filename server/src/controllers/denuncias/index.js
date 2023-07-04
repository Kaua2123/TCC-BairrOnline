const knex = require('../../database/banco');

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

            await knex('denuncias').insert({

                den_cod,
                den_nome,
                den_prazo,
                den_desc,
        


            });
            console.log(den_cod, den_nome, den_prazo, den_desc);
            return res.status(201).send("DENÚNCIA CRIADA");
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: error.message});
        }
    }
}