const knex = require('../../database/banco');
const multer = require('multer');
const express = require('express');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../uploadImg')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = {

    async raiz(req, res) {
        try {
            return res.send('pagina raiz');
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },


    async uploadImagem(req, res) {
        try {
            const { originalname, mimetype } = req.file; // requisiçao de arquivo

            const denunciante_usuario_usu_cod = req.body.denunciante_usuario_usu_cod;
            const denuncias_den_cod = req.body.denuncias_den_cod;

            // detalhes da imagem no banco de dados usando Knex
            await knex('imagem').insert({
                img_nome: originalname,
                img_tipo: mimetype,
                img_data: new Date(), //pegar a data atual 
                denunciante_usuario_usu_cod,
                denuncias_den_cod
            });

            return res.status(201).json({ message: 'Imagem enviada' });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: error.message });
        }
    },
};