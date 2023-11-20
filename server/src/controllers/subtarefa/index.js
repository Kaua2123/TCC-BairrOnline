const knex = require('../../database/banco')

module.exports = {

    async criarSubtarefa(req, res) { // para criação de subtarefas (institution)
        try {
            const { sub_data_inicio } = req.body;
            const { sub_data_conclusao } = req.body;
            const { sub_texto } = req.body;
            const { sub_prioridade } = req.body;
            const { sub_estado } = req.body;
            const { acompanhamento_aco_num } = req.body;
            const { usuario_usu_cod } = req.body;

            await knex('subtarefa').insert({
                sub_data_inicio: new Date().toISOString(),
                sub_data_conclusao: new Date().toISOString(),
                sub_texto,
                sub_prioridade,
                sub_estado,
                acompanhamento_aco_num,
                usuario_usu_cod
            })

            const totalSubtarefas = await knex('subtarefa')
            .count('sub_cod as count')
            .where('acompanhamento_aco_num', acompanhamento_aco_num)
            .first();
      
            if (totalSubtarefas.count >= 3) {
                return res.status(400).json({ error: 'Limite de subtarefas atingido para este acompanhamento.' });
            }

            return res.status(200).json({ msg: 'subtarefa criada' })
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getSubtarefa(req, res) {
        try {
          const { usu_cod } = req.usuario;
          const { cod } = req.params; // Adicionando a obtenção do número do acompanhamento a partir dos parâmetros da solicitação
      
          const subtarefas = await knex('subtarefa')
            .select('*')
            .where('usuario_usu_cod', usu_cod)
            .where('acompanhamento_aco_num', cod); // Filtrando com base no número do acompanhamento
      
          return res.status(200).json(subtarefas);
        } catch (error) {
          return res.status(400).json({ error: error.message });
        }
      },
      

    async getSubtarefaPorAcompanhamento(req, res) {
        try {

            const { aco_num } = req.params;
    
            const subtarefas = await knex('subtarefa').select('*').where('acompanhamento_aco_num', aco_num);
    
            return res.status(200).json(subtarefas);


        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async concluirSubtarefa(req, res) {
        try {
          const { cod } = req.params;
          const { sub_estado } = req.body;

          await knex('subtarefa').update({
            sub_estado: 'concluida'
          }).where('sub_cod', cod)
        
      
          return res.status(200).json({ message: 'Subtarefa concluída com sucesso.' });
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      },

    async deleteSubtarefa(req, res) { // para deletar as subtarefas
        try {
            const { cod } = req.params;

            const subtarefas = await knex('subtarefa').where('sub_cod', cod).first();

            if (!subtarefas) {
                return res.status(400).json({ error: 'Não há subtarefas.' })
            }

            await knex('subtarefa').where('sub_cod', cod).del();
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },



}