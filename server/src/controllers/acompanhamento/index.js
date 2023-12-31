const knex = require('../../database/banco')

module.exports = {

    async criarAcompanhamento(req, res) {
        try {

            const { aco_progresso } = req.body;
            const { aco_estado } = req.body;
            const { aco_mensagem } = req.body;
            const { usuario_usu_cod } = req.body;
            const { denuncias_den_cod } = req.body;

            const denunciaExists = await knex('denuncias').where('den_cod', denuncias_den_cod).first();
             if (!denunciaExists) {
                return res.status(404).json({ error:'Denúncia não encontrada'});
         }

         const acompanhamentoExists = await knex('acompanhamento').where({denuncias_den_cod, usuario_usu_cod}).first();

         if (acompanhamentoExists) {
            return res.status(400).json({ error: 'Você já assumiu essa denúncia.' });
          }

        const denunciaAssumida = await knex('acompanhamento')
        .where('denuncias_den_cod', denuncias_den_cod)
        .first();

        if (denunciaAssumida) {
            return res.status(401).json({ error: 'Esta denúncia já foi assumida por outra instituição.' });
        }

         const acoData = new Date().toISOString();


         await knex('acompanhamento').insert({

           aco_data: acoData,
           aco_estado,
           aco_mensagem,
           usuario_usu_cod,
           denuncias_den_cod


         });

        return res.status(201).json({ message: 'Acompanhamento criado com sucesso.'});

        }
        catch(error){
              return res.status(500).json({ error: error.message });
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
    },

    async getEstadoAcompanhamento(req, res) {
        try {
            const { cod } = req.params;

            const acompanhamento = await knex('acompanhamento')
            .select('aco_estado')
            .where({ 'denuncias_den_cod': cod })
            .orderBy('aco_data', 'desc')
            .first(); 

            if (!acompanhamento) {
                return res.status(404).json({ error: 'impossível obter o estado do acompanhamento para esta denúncia.' });
              }


            return res.status(200).json({estado: acompanhamento.aco_estado})

        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    async concluirAcompanhamento(req, res) {
        try {
            const {cod} = req.params;

            await knex('acompanhamento').update({
                aco_estado: 'concluida'
            }).where('aco_num', cod);

            return res.status(200).json({ message: 'Acompanhamento/Denúncia concluída com sucesso.' });
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    
}
