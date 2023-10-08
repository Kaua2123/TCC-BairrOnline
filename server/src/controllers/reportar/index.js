const knex = require('../../database/banco');


module.exports = {
    async postReportar(req, res){ //para criar reclamações
        try {
            
            const { rep_motivo } = req.body;
            const { rep_acao_tomada } = req.body;
            const { rep_status } = req.body;
            const { denuncias_den_cod } = req.body;
            const { usuario_usu_cod } = req.body;

            await knex('reportar').insert({
                rep_motivo,
                rep_data: new Date().toISOString(),
                rep_acao_tomada,
                rep_status,
                denuncias_den_cod,
                usuario_usu_cod  
            })

        return res.status(200).json({msg: 'Reportado com sucesso.'})
        } 
        catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    async denunciasReportadas(req, res){ //get das denuncias reportadas
        try {
            
            const reportadas = await knex('reportar').select('reportar.*', 'usuario.usu_nome')
            .join('usuario', 'reportar.usuario_usu_cod', 'usuario.usu_cod');

            return res.status(200).json(reportadas);

        } 
        catch (error) {
            return res.status(400).json({error: 'Erro ao obter as denúncias reportadas.'})
        }
    },
}
