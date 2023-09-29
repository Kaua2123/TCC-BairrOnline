const knex = require('../../database/banco')

module.exports = {

    async criarAcompanhamento(req, res) {
        try {

            const { aco_progresso } = req.body;
            const { usuario_usu_cod } = req.body;
            const { denuncias_den_cod } = req.body;

            const denunciaExists = await knex('denuncias').where('den_cod', denuncias_den_cod).first();
             if (!denunciaExists) {
                return res.status(404).json({ error:'Denúncia não encontrada'});
         }

         const acompanhamentoExists = await knex('acompanhamento').where({denuncias_den_cod, usuario_usu_cod}) .first();

         if (acompanhamentoExists) {
            return res.status(400).json({ error: 'Esta denúncia já foi assumida pela instituição.' });
          }


         const acoData = new Date().toISOString();

         await knex('acompanhamento').insert({

           aco_data: acoData,
           aco_progresso: new Date().toISOString(),
           usuario_usu_cod,
           denuncias_den_cod


         });

            return res.status(201).json({ message: 'Acompanhamento criado com sucesso.'});

        } catch(error){
              return res.status(400).json({ error: error.message });
        }
    },

    async getAcompanhamentos(req, res) {
        try {

            const {usu_cod} = req.usuario;

            const acompanhamentos = await knex('acompanhamento')
            .select('acompanhamento.*', 'denuncias.den_nome')
            .join('denuncias', 'acompanhamento.denuncias_den_cod', 'denuncias.den_cod')
            .where('acompanhamento.usuario_usu_cod', usu_cod)

            if(!acompanhamentos){
                return res.status(400).json({error: 'nenhum acompanhamento encontrado'});
            }

            return res.status(200).json(acompanhamentos);


        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}
