const knex = require('../../database/banco');
const bcrypt = require('bcrypt');


module.exports = {
    async raiz(req, res){
        try {
            return res.send("pagina raiz");
        } catch (error) {
            return res.status(400).json({error: error.message});
        }   
    },

    async CriarUsuario(req, res){
        try {
            const { usu_nome } = req.body;
            const { usu_email } = req.body;
            const { usu_senha } = req.body;
            const { usu_tel } = req.body;
            const { usu_img } = req.body;
            const { usu_cep } = req.body;
            const { usu_tipo } = req.body;
            
            const senhaCriptog = await bcrypt.hash(usu_senha, 10);

            const [usu_cod] = await knex('usuario').insert({
              
                usu_nome,
                usu_email,
                usu_senha: senhaCriptog,
                usu_tel,
                usu_img,
                usu_cep,
                usu_data: new Date(), //data de criação do usuário
                usu_tipo
            });

            await knex(usu_tipo).insert({
                usuario_usu_cod: usu_cod
            })

 

        return res.status(201).json({message: 'Usuário criado.'})
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: error.message});
          
        }
    },

}