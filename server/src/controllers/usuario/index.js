require('dotenv').config({path: '../.env'}); // lendo o arquivo env
const knex = require('../../database/banco');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
                    const token = jwt.sign({usu_cod: usuario[0].usu_cod}, process.env.CHAVE_JWT, {expiresIn: '1h'});
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
    }

}