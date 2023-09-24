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

    async msgNotificacao(req, res){ //post só da mensagem
      try {
        const { not_titulo } = req.body
        const { not_mensagem } = req.body;
        const { usuario_usu_cod } = req.body;
        const { denuncias_den_cod } = req.body;

          const denunciaExists = await knex('denuncias').where('den_cod', denuncias_den_cod).first();

        await knex('notificacao').insert({
          not_titulo,
          not_mensagem,
          usuario_usu_cod: denunciaExists.usuario_usu_cod,
          denuncias_den_cod,
        })

        return res.status(201).json({msg: 'mensagem enviada'})
      }
      catch (error) {
        return res.status(400).json({error: error.message});
      }
    },

    async getNotificacoes(req, res){ //pegar as notificações
        try {

            const {usu_cod} = req.usuario; //verificando o codigo do usuario logado


            const notificacoes = await knex('notificacao')
              .select('notificacao.*', 'denuncias.den_nome', 'denuncias.den_img', 'usuario.usu_nome as inst_nome')
              .join('denuncias', 'notificacao.denuncias_den_cod', 'denuncias.den_cod')
              .join('usuario', 'denuncias.usuario_usu_cod', 'usuario.usu_cod')
              .where('notificacao.usuario_usu_cod', usu_cod);

            if (!notificacoes) {
                return res.status(400).json({error: 'Nenhuma notificação.'})
            }

            return res.status(200).json(notificacoes);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },
}
