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

const upload = multer({ storage });



module.exports = {

    async raiz(req, res) {
        try {
            return res.send("pagina raiz");
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async criarDenuncia(req, res) {
        try {
            const { den_nome } = req.body;
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

    async uparImagem(req, res) {
        try {
            const { cod } = req.params;
            upload.single('selectedImage')(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    console.log(err)
                    return res.status(400).json({ error: 'Erro ao upar a imagem.' });
                }
                else if (err) {
                    console.log(err)
                    return res.status(500).json({ error: 'Erro inesperado.' });
                }

                console.log(req.file);

                if (!req.file) {
                    console.log("Arquivo não enviado:", req.file);
                    return res.status(500).json({ error: 'Arquivo não enviado' })
                }

                await knex('denuncias').where("den_cod", cod).update({
                    den_img: req.file.filename,
                });

                return res.status(200).json({ message: 'Arquivo recebido' });
            });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Erro ao upar a imagem.' });
        }
    },

    async retornaImagem(req, res) {
        try {
            const { filename } = req.params;
            const imagePath = path.resolve(__dirname, '..', '..', 'imgsDen', filename);

            fs.readFile(imagePath, (error, data) => {
                if (error) {
                    return res.status(500).json({ error: 'n leu a img' });
                }

                res.setHeader('contentType', `image/${path.extname(filename)}`);
                res.end(data);
            })


        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async getDenuncia(req, res) { // get da denuncia
        try {
            const denuncias = await knex('denuncias').select('denuncias.*', 'usuario.usu_nome', 'usuario.usu_img') // juntando duas tabelas
            .join('usuario', 'denuncias.usuario_usu_cod', 'usuario.usu_cod') //pra pegar a img e o nome do usuario e exibir nos cards
           

            return res.status(200).json(denuncias); //retorna as denuncias
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao obter a denúncia' });
        }
    },

    async getDenunciaLogado(req, res) { // get da denuncias dos usuarios logados.
        try {

            const {usu_cod} = req.usuario; //verificando o codigo do usuario logado

            const denuncias = await knex('denuncias').select('denuncias.*', 'usuario.usu_nome', 'usuario.usu_img') // juntando duas tabelas
            .join('usuario', 'denuncias.usuario_usu_cod', 'usuario.usu_cod')
            .where('denuncias.usuario_usu_cod', usu_cod); 

            return res.status(200).json(denuncias); //retorna as denuncias
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao obter a denúncia' });
        }
    },

    async getDenunciaExcluida(req, res) { //get das denuncias excluidas. protegida pelo token também
        try {

            const {usu_cod} = req.usuario; //verificando o codigo do usuario logado

            const denunciaExcluida = await knex('denuncias_excluidas')
            .select('*')
            .where('denuncias_excluidas.usuario_usu_cod', usu_cod)
            return res.status(200).json(denunciaExcluida);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao obter denúncias excluidas' });
        }
    },


    async deleteDenuncia(req, res) { //deleta as denuncias pelo codigo, salvando elas em uma tabela de denuncias excluidas
        try {
            const { cod } = req.params;

            const denuncia = await knex('denuncias').where('den_cod', cod).first();
            if (!denuncia) {
                return res.status(400).json({ error: 'Denúncia não encontrada.' });
            }

            const dataExclusao = new Date().toISOString();

            await knex('denuncias_excluidas').insert({
                den_cod: denuncia.den_cod,
                den_nome: denuncia.den_nome,
                den_prazo: denuncia.den_prazo,
                den_desc: denuncia.den_desc,
                den_data: denuncia.den_data,
                den_img: denuncia.den_img,
                den_bairro: denuncia.den_bairro,
                den_problema: denuncia.den_problema,
                usuario_usu_cod: denuncia.usuario_usu_cod,
                den_data_exclusao: dataExclusao,
            });

            if (await knex('denuncias').where("den_cod", cod) != '') { // se houver denuncia, poderá ser deletada
                await knex('denuncias').del().where("den_cod", cod);
                return res.status(201).json({ message: 'Denúncia deletada e movida para tabela denuncias excluidas.' })
            }
            else {
                return res.status(201).json({ message: 'Impossível deletar uma denúncia inexistente.' })
            }
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async deleteTodasDenuncias(req, res) { // deletar TODAS denúncias
        try {

            const denuncias = await knex('denuncias').select('*');
            if (!denuncias || denuncias.length === 0) {
                return res.status(400).json({ error: 'Denúncia não encontrada.' });
            }

            const dataExclusao = new Date().toISOString();
             
            for (const denuncia of denuncias) {
                await knex('denuncias_excluidas').insert({
                  den_cod: denuncia.den_cod,
                  den_nome: denuncia.den_nome,
                  den_prazo: denuncia.den_prazo,
                  den_desc: denuncia.den_desc,
                  den_data: denuncia.den_data,
                  den_img: denuncia.den_img,
                  den_bairro: denuncia.den_bairro,
                  den_problema: denuncia.den_problema,
                  usuario_usu_cod: denuncia.usuario_usu_cod,
                  den_data_exclusao: dataExclusao,
                });
              }

            await knex('denuncias').del();
            return res.status(201).json({ message: 'Todas as denúncias foram deletadas com sucesso.' });

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

  

    async reverterDenunciaExcluida(req, res) { // reversão de denuncias
        try {
            const { cod } = req.params;

            const denunciaExcluida = await knex('denuncias_excluidas').where('den_cod', cod).first();

            if (!denunciaExcluida) {
                return res.status(400).json({ error: 'Não há denuncias excluidas para reverter.' });
            }

            await knex('denuncias').insert({ //inserindo de novo na tabela de denúncias os dados da denuncia que foi excluida
                den_cod: denunciaExcluida.den_cod,
                den_nome: denunciaExcluida.den_nome,
                den_prazo: denunciaExcluida.den_prazo,
                den_desc: denunciaExcluida.den_desc,
                den_data: denunciaExcluida.den_data,
                den_img: denunciaExcluida.den_img,
                den_bairro: denunciaExcluida.den_bairro,
                den_problema: denunciaExcluida.den_problema,
                usuario_usu_cod: denunciaExcluida.usuario_usu_cod,
            })

            await knex('denuncias_excluidas').where('den_cod', cod).del();
            return res.status(200).json({ message: 'Denúncia revertida com sucesso.' })
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async updateDenuncia(req, res) { // atualizar os dados da denuncia
        try {
            const { cod } = req.params; //verificando o codigo

            const { den_nome } = req.body;
            const { den_desc } = req.body;

            const denunciaExists = await knex('denuncias').where('den_cod', cod).first();
            if (!denunciaExists) {
                return res.status(400).json({ error: 'Denúncia não encontrada.' })
            }

            await knex('denuncias').update({ //atualizar o nome/titulo e a descrição.
                den_nome,
                den_desc
            }).where('den_cod', cod);

            return res.status(201).json({ message: 'Dados da denúncia atualizados.' })

        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async curtirDenuncia(req, res) {
        try {
            
            const {cod} = req.params;

            await knex('denuncias').where('den_cod', cod).increment('den_like', 1);

            return res.status(200).json({ msg: 'Denúncia curtida com sucesso.'})
        } 
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async updatePrazoDenuncia(req, res) { // pras instituições. poderão dar um prazo de resoluçao pras denuncias
        try {

        }
        catch (error) {

        }
    }
}
