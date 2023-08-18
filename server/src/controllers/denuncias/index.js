const knex = require('../../database/banco');

module.exports = {
    
    async raiz(req, res){
        try {
            return res.send("pagina raiz");
        } 
        catch (error) {
            return res.status(400).json({error: error.message});
        }   
    },

    async criarDenuncia(req, res){
        try {
            // const { den_cod }  = req.body;
            const { den_nome } = req.body;
            const { den_prazo } = req.body;
            const { den_desc } = req.body;
            const { den_img } = req.body;
            const { bairro_bai_cod } = req.body;
            const { denunciante_usuario_usu_cod } = req.body;

            const bairroExists = await knex('bairro').where('bai_cod', bairro_bai_cod).first();

            const dataAtual = new Date().toISOString();

            if(!bairroExists){
                return res.status(400).json({error: 'Valor inválido para bairro_bai_cod'});
            }

            await knex('denuncias').insert({

                // den_cod, n precisa de codigo pq ta com auto increment
                den_nome,
                // den_prazo,
                den_desc,
                den_data: dataAtual,
                den_img,
                bairro_bai_cod,
                denunciante_usuario_usu_cod,
        


            });

  
           return res.status(201).json({message: 'Denúncia enviada'});
        } 
        catch (error) {
            console.log(error);
            return res.status(400).json({error: error.message});
        }
    },

    async cardDenuncia(req, res){ // get da denuncia
        try {
            const denuncias = await knex('denuncias').select('*');

            return res.status(200).json(denuncias); //retorna as denuncias
        } 
        catch (error) {
            return res.status(400).json({error: 'Erro ao criar o card.'});
        }
    },

    async deleteDenuncia(req, res){ //deleta as denuncias pelo codigo
        try {
            const {cod} = req.params;
            if (await knex('denuncias').where("den_cod", cod) != ''){ // se houver denuncia, poderá ser deletada
                await knex('denuncias').del().where("den_cod", cod);
                return res.status(201).json({message: 'Denúncia deletada.'})
            }
            else{
                return res.status(201).json({message: 'Impossível deletar uma denúncia inexistente.'})
            }
        } 
        catch (error) {
           return res.status(400).json({error: error.message});
        }
    },

    async updateDenuncia(req, res){ // atualizar os dados da denuncia 
        try {
            const { cod } = req.params; //verificando o codigo

            const { den_nome } = req.body;
            const { den_desc } = req.body;

            const denunciaExists = await knex('denuncias').where('den_cod', cod).first();
            if (!denunciaExists){
                return res.status(400).json({error: 'Denúncia não encontrada.'})
            }

            await knex('denuncias').update({ //atualizar o nome/titulo e a descrição.
                den_nome,
                den_desc
            }).where('den_cod', cod);
            
            return res.status(201).json({message: 'Dados da denúncia atualizados.'})

        } 
        catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    async updatePrazoDenuncia(req, res){ // pras instituições. poderão dar um prazo de resoluçao pras denuncias
        try {
            
        } 
        catch (error) {
            
        }
    }
}