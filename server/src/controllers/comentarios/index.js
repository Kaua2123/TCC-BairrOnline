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

    async criarComent(req, res){
        try {
            const { com_conteudo } = req.body;
            const { usuario_usu_cod } = req.body;
            const { denuncias_den_cod } = req.body;

            await knex('comentarios').insert({

                com_conteudo,
                com_data: new Date().toISOString(),
                usuario_usu_cod,
                denuncias_den_cod,
    
            });


            return res.status(201).json({message: 'Comentário enviado'});
        }

        catch (error) {
            console.log(error);
            return res.status(400).json({error: error.message});
        }
    },


    async deleteComentario(req, res){ //deleta os comentarios pelo codigo
        try {
            const {cod} = req.params;
            if (await knex('comentarios').where("com_id", cod) != ''){ // se houver comentario, poderá ser deletado
                await knex('comentarios').del().where("com_id", cod);
                return res.status(201).json({message: 'Comentário deletado.'})
            }
            else{
                return res.status(201).json({message: 'Impossível deletar um comentário inexistente.'})
            }
        } 
        catch (error) {
           return res.status(400).json({error: error.message});
        }
    },

    async updateComentario(req, res){ // atualizar os dados do comentario
        try {
            const { cod } = req.params; //verificando o codigo

            const { com_conteudo } = req.body;
            const { usuario_usu_cod } = req.body;

            const comentarioExists = await knex('comentarios').where('com_id', cod).first();
            if (!comentarioExists){
                return res.status(400).json({error: 'Comentário não encontrado.'})
            }

            await knex('comentarios').update({ //atualizar o conteudo e nome do usuario.
                com_conteudo,
                usuario_usu_cod
            }).where('com_id', cod);
            
            return res.status(201).json({message: 'Dados do comentário atualizados.'})

        } 
        catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    async buscarComentario(req, res) {
        try {
            const comentarios = await knex('comentarios').select('*');

            return res.status(200).json(comentarios)
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }
}
