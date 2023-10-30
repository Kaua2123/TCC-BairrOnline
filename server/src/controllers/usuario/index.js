require('dotenv').config({path: '../.env'}); // lendo o arquivo env
const knex = require('../../database/banco');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

// pra criar o q envia o email do oauth2
const criarTransporte = async () => {
    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_USER,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken.token
        }
    });

    return transporter;
};


const storage = multer.diskStorage({ 
    destination: './imgsPerfil',
    filename: function (req, file, cb) {
        const arquivoUnico = uniqid() + path.extname(file.originalname);
        cb(null, arquivoUnico);
    }
});

const upload = multer({ storage }); 




module.exports = {
    async raiz(req, res){
        try {
            return res.send("pagina raiz");
        } catch (error) {
            return res.status(400).json({error: error.message});
        }   
    },

    async CriarUsuario(req, res){ // cadastra os usuários
        try {
            const { usu_nome } = req.body;
            const { usu_email } = req.body;
            const { usu_senha } = req.body;
            const { usu_tel } = req.body;
            const { usu_img } = req.body;
            const { usu_cep } = req.body;
            const { usu_tipo } = req.body;
            
            const senhaCriptog = await bcrypt.hash(usu_senha, 10);

            const usuarioExistente = await knex('usuario').where('usu_email', usu_email).first();
            if(usuarioExistente){
                return res.status(400).json({error: 'Essa conta já existe.'})
            }

            await knex('usuario').insert({
              
                usu_nome,
                usu_email,
                usu_senha: senhaCriptog,
                usu_tel,
                usu_img,
                usu_cep,
                usu_data: new Date(), //data de criação do usuário
                usu_tipo
            });

 

        return res.status(201).json({message: 'Usuário criado.'})
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: error.message});
          
        }
    },
    
    async logarUsuario(req, res){ //login, autentica usuários
        try {


            const { usu_email } = req.body;
            const { usu_senha } = req.body;

            const usuario = await knex('usuario').where('usu_email', usu_email); //consulta o banco

            if (usuario.length > 0){

                const senhaCorrespondente = await bcrypt.compare(usu_senha, usuario[0].usu_senha); 
                console.log('senha correspondente:', senhaCorrespondente);

                if (senhaCorrespondente) {
                    //senha válida, logo irá gerar um token JWT.
                    console.log('Credenciais corretas');
                    const token = jwt.sign({usu_cod: usuario[0].usu_cod, usu_tipo: usuario[0].usu_tipo}, process.env.CHAVE_JWT, {expiresIn: '1h'});
                    console.log(token);

                    
                    return res.status(200).json({message: 'Login sucedido', auth: true, token: token});

                } else {
                    return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
                }

            } else {
                return res.status(401).json({ message: 'Não há usuários cadastrados.' });
            }
          
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async getUsuarios(req, res) { //receber todos os dados dos usuarios
        try {
            const usuarios = await knex('usuario').select('*');

            return res.status(200).json(usuarios)
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    },

    async getUsuarioLogado(req, res) { // get do usuario loagdo
        try {

            const {usu_cod} = req.usuario; //verificando o codigo do usuario logado

            const usuarios = await knex('usuario').select('*') // juntando duas tabelas
            .where('usuario.usu_cod', usu_cod); 

            return res.status(200).json(usuarios); //retorna as denuncias
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao obter a denúncia' });
        }
    },

    async updateUsuarios(req, res) { // para atualização dos dados do usuário
        try {

            const {cod} = req.params;

            const { usu_nome } = req.body;
            const { usu_email } = req.body;


            await knex('usuario').update({
                usu_nome,
                usu_email,
            }).where('usu_cod', cod);

            return res.status(200).json({msg: 'Dados atualizados.'})

        } 
        catch (error) {
            return res.status(400).json({error: error.message});
        }
    }, 

    async emailRecuperarSenha(req, res) {
        try {
            const { usu_email } = req.body;

            const usuario = await knex('usuario').where('usu_email', usu_email).first();
            if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            
            const token = jwt.sign({ usu_email: usu_email }, process.env.CHAVE_JWT, { expiresIn: '1h' });

            // const resetarSenhaLink = `http://127.0.0.1:5173/RedefinirSenha?token=${token}`;
         const resetarSenhaLink = `http://localhost:5173/RedefinirSenha?token=${token}`;
            
             const mailOptions = {
                from: process.env.EMAIL_USER,
                to: usu_email,
                subject: 'Recuperação de Senha',
                text: `Clique no link a seguir para redefinir sua senha: ${resetarSenhaLink}`,
            };

            const transporter = await criarTransporte();
            await transporter.sendMail(mailOptions);
            
            return res.status(200).json({ message: 'Um email de recuperação de senha foi enviado.' });
        } catch (error) {   
            return res.status(500).json({ error: error.message });
        }
    },

    async updateSenha(req, res) {
        try {
            
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    async getInstituicoes(req, res) { // receber só dos usuarios tipo instituição
        try {
            const instituicoes = await knex('usuario').select('*').where('usu_tipo', 'instituicao');

            return res.status(200).json(instituicoes);
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    },

    async imgPerfil(req, res) {
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

                await knex('usuario').where("usu_cod", cod).update({
                    usu_img: req.file.filename,
                });

                return res.status(200).json({ message: 'Arquivo recebido' });
            });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Erro ao upar a imagem.' });
        }
    },

    async retornaImgPerfil(req, res) {
        try {
            const { filename } = req.params;
            const imagePath = path.resolve(__dirname, '..', '..', 'imgsPerfil', filename);

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
    
   
}