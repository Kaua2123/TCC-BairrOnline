const knex = require('../../database/banco');

module.exports = {
    
    async raiz(req, res){
        try{
            return res.send('Raíz das notificações');
        }
        catch (error) {
            return res.status(500).json({error: error.message});
        }
    },

    async getNotificacoes(req, res){ //pegar as notificações
        try {

            const {usu_cod} = req.usuario; //verificando o codigo do usuario logado


            const notificacoes = await knex('notificacao')
            .select('notificacao.*', 'denuncias.den_nome', 'denuncias.den_img')
            .join('denuncias', 'notificacao.denuncias_den_cod', 'denuncias.den_cod')
            // .where('notificacao.usuario_usu_cod', usu_cod);

            if (!notificacoes) {
                return res.status(400).json({error: 'Nenhuma notificação.'})
            }

            return res.status(200).json(notificacoes);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}