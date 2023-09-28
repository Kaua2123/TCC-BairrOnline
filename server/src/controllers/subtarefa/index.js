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

            return res.status(200).json({msg: 'subtarefa criada'})
        }
        catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

}