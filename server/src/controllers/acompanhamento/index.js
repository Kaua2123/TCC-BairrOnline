const knex = require('../../database/banco')
 
module.exports = {
    
    async criarAcompanhamento(req, res) {
        try {
            const { denuncias_den_cod } = req.body;
            const { aco_progresso } = req.body;
            const { instituicao_usuario_usu_cod } = req.body;

              
            const denunciaExists = await knex('denuncias').where('denuncias_den_cod').first();
             if (!denunciaExists) {
                return res.status(404).json({ error:'Denúncia não encontrada'});                            
         }      
       
         const aco_data = new Date().toISOString();

         await knex('acompanhamento').insert({
         
           denuncias_den_cod,
           aco_data: new Date(),
           aco_progresso,
           instituicao_usuario_usu_cod

         });

            return res.status(201).json({ message: 'Acompanhamento criado com sucesso.'});

        } catch(error){
              return res.status(400).json({ error: error.message });
        }
    }, 

    async getAcompanhamentos(req, res) {
        try {
            const { denuncias_den_cod } = req.params;
            
        
             const denunciaExists = await knex('denuncias').where('den_cod',  denuncias_den_cod).first();
             if(!denunciaExits) {
                return res.status(404).json({ error: 'Denúncia nao encontrada'})
             }
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}