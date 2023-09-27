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

        const {usu_cod} = req.usuario;

        const denunciaExists = await knex('denuncias').where('den_cod', denuncias_den_cod).first();

        const usuario = await knex('usuario').where('usu_cod', usu_cod).first();

        if (!usuario) {
          return res.status(400).json({ error: 'Usuário não encontrado.' });
        }

        await knex('notificacao').insert({
          not_titulo,
          not_mensagem,
          not_data: new Date().toISOString(),
          usuario_usu_cod: usu_cod,
          denuncias_den_cod,
        })

        return res.status(201).json({msg: 'mensagem enviada', usu_nome: usuario.usu_nome})
      }
      catch (error) {
        return res.status(400).json({error: error.message});
      }
    },

    async getNotificacoes(req, res){ //pegar as notificações
        try {

            const {usu_cod} = req.usuario; //verificando o codigo do usuario logado


            const notificacoes = await knex('notificacao')
              .select('notificacao.*', 'denuncias.den_nome', 'denuncias.den_img', 'usuario.usu_tipo', 'usuario.usu_nome')
              .join('denuncias', 'notificacao.denuncias_den_cod', 'denuncias.den_cod')
              .join('usuario', 'denuncias.usuario_usu_cod', 'usuario.usu_cod')
              .where('usuario.usu_cod', usu_cod);

            if (!notificacoes) {
                return res.status(400).json({error: 'Nenhuma notificação.'})
            }

            return res.status(200).json(notificacoes);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    async deleteNotificacoes(req, res){
      try {

        const {cod} = req.params;

        const notificacoes = await knex('notificacao').where('not_cod', cod).first();
        if (!notificacoes) {
          return res.status(400).json({error: 'notificação inexistente.'})
        }

        await knex('notificacao').where('not_cod', cod).del();

        return res.status(200).json({msg: 'Notificação deletada com sucesso.'})
      } catch (error) {
        return res.status(400).json({error: error.message});
      }
    },
}
