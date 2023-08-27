const multer = require('multer');
const knex = require('../../database/banco');
const uniqid = require('uniqid');
const path = require('path');


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

    async criarDenuncia(req, res){
        try {
            const { den_nome } = req.body;
            const { den_prazo } = req.body;
            const { den_desc } = req.body;
            const { den_img } = req.body;
            const { den_bairro } = req.body;

            const { denunciante_usuario_usu_cod } = req.body;

            const dataAtual = new Date().toISOString();

            
            await knex('denuncias').insert({

                den_nome,
                den_desc,
                den_data: dataAtual,
                den_bairro,
                denunciante_usuario_usu_cod,
   
            });

  
           return res.status(201).json({message: 'Denúncia enviada'});
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({error: error.message});
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
                    console.log("Arquivo nao enviado:", req.file);
                    return res.status(500).json({error: 'Arquivo nao enviado'})
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