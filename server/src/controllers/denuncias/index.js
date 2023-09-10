const multer = require('multer');
const knex = require('../../database/banco');
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: './imgsDen',
    filename: function (req, file, cb) {
      const arquivoUnico = uniqid() + path.extname(file.originalname);
      cb(null, arquivoUnico);
    }
  });

const upload = multer({storage});



module.exports = {

    async raiz(req, res){
        try {
            return res.send("pagina raiz");
        }
        catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    async criarDenuncia(req, res) {
        try {
          const { den_nome }= req.body;
          const { den_prazo } = req.body;
          const { den_desc } = req.body;
          const { den_bairro } = req.body;
          const { den_problema } = req.body;
          const { usuario_usu_cod } = req.body;

          const dataAtual = new Date().toISOString();

            await knex('denuncias').insert({
              den_nome,
              den_desc,
              den_data: dataAtual,
              den_bairro,
              den_problema,
              usuario_usu_cod,

            });

            return res.status(201).json({ message: 'Denúncia enviada' });

        } catch (error) {
          console.log(error);
          return res.status(400).json({ error: error.message });
        }
      },

    async uparImagem(req, res){
        try {
            const {cod} = req.params;
            upload.single('selectedImage')(req, res, async function (err){
                if (err instanceof multer.MulterError) {
                    console.log(err)
                    return res.status(400).json({ error: 'Erro ao upar a imagem.' });
                }
                else if(err){
                    console.log(err)
                    return res.status(500).json({ error: 'Erro inesperado.' });
                }

                console.log(req.file);

                if(!req.file){
                    console.log("Arquivo não enviado:", req.file);
                    return res.status(500).json({error: 'Arquivo não enviado'})
                }

            await knex('denuncias').where("den_cod", cod).update({
                den_img: req.file.filename,
            });

            return res.status(200).json({message: 'Arquivo recebido'});
        });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Erro ao upar a imagem.' });
        }
    },

    async retornaImagem(req, res){
        try {
            const {filename}  = req.params;
            const imagePath = path.resolve(__dirname, '..', '..', 'imgsDen', filename);

            fs.readFile(imagePath, (error, data) => {
                if (error) {
                    return res.status(500).json({error: 'n leu a img'});
                }

                res.setHeader('contentType', `image/${path.extname(filename)}`);
                res.end(data);
            })


        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    },

    async cardDenuncia(req, res){ // get da denuncia
        try {
            const denuncias = await knex('denuncias').select('*');

            return res.status(200).json(denuncias); //retorna as denuncias
        }
        catch (error) {
            return res.status(400).json({error: 'Erro ao criar o card.'});
        }
    },

    async deleteDenuncia(req, res){ //deleta as denuncias pelo codigo
        try {
            const {cod} = req.params;
            if (await knex('denuncias').where("den_cod", cod) != ''){ // se houver denuncia, poderá ser deletada
                await knex('denuncias').del().where("den_cod", cod);
                return res.status(201).json({message: 'Denúncia deletada.'})
            }
            else{
                return res.status(201).json({message: 'Impossível deletar uma denúncia inexistente.'})
            }
        }
        catch (error) {
           return res.status(400).json({error: error.message});
        }
    },

    async deleteTodasDenuncias(req, res){ // deletar TODAS denúncias
        try {

            await knex('denuncias').del();
            return res.status(201).json({message: 'Todas as denúncias foram deletadas com sucesso.'});

        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    async reverterDenunciaExcluida(req, res){
      try{
        const {cod} = req.params;

        const denunciaExcluida = await knex('denuncias_excluidas').where('den_cod', cod).first();

        if (!denunciaExcluida){
          return res.status(400).json({error: 'Não há denuncias excluidas para reverter.'});
        }

        const dataAtual = new Date().toISOString();

        await knex('denuncias').insert({
          den_cod: denunciaExcluida.den_cod,
          den_data_exclusao: dataAtual
        })
      }
      catch (error){
        return res.status(400).json({error: error.message});
      }
    },

    async updateDenuncia(req, res){ // atualizar os dados da denuncia
        try {
            const { cod } = req.params; //verificando o codigo

            const { den_nome } = req.body;
            const { den_desc } = req.body;

            const denunciaExists = await knex('denuncias').where('den_cod', cod).first();
            if (!denunciaExists){
                return res.status(400).json({error: 'Denúncia não encontrada.'})
            }

            await knex('denuncias').update({ //atualizar o nome/titulo e a descrição.
                den_nome,
                den_desc
            }).where('den_cod', cod);

            return res.status(201).json({message: 'Dados da denúncia atualizados.'})

        }
        catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    async updatePrazoDenuncia(req, res){ // pras instituições. poderão dar um prazo de resoluçao pras denuncias
        try {

        }
        catch (error) {

        }
    }
}
