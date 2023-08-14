const knex = require('../../database/banco');

module.exports = {
    async raiz(req, res){
        try{
            return res.send('página raiz');
        }catch(error){
            return res.status(400).json({error: error.message});
        }
    },

    async postaImagem(req, res){
        try{

            const { img_nome } = req.body; // nome descritivo da imagem
            const { img_tipo } = req.body; //tipo da imagem, se é jpg, png, gif, etc
            const { img_data } = req.body; // data de envio da iamgem
            const { denunciante_usuario_usu_cod } = req.body;
            const { denuncias_den_cod } = req.body;

            await knex('imagem').insert({
                img_nome,
                img_tipo,
                img_data,
                denunciante_usuario_usu_cod,
                denuncias_den_cod
            })

            return res.status(201).json({message: 'Imagem enviada'});
        }catch(error){
            console.log(error);
            return res.status(400).json({error: error.message});
        }
    },
}