const knex = require('../../database/banco');


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


            await knex('usuario').insert({
              
                usu_nome,
                usu_email,
                usu_senha,
                usu_tel,
                usu_img,
                usu_cep,
                usu_data: new Date() //data de criação do usuário
            });

 

        return res.status(201).json({message: 'Usuário criado.'})
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: error.message});
          
        }
    },

}