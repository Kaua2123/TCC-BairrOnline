const express = require('express'); 



const controllersAcomp = require('./src/controllers/acompanhamento/index');
const controllersAdm = require('./src/controllers/administrador/index');
const controllersAva = require('./src/controllers/avaliaçao/index');
const controllersBairro = require('./src/controllers/bairro/index');
const controllersComen = require('./src/controllers/comentarios/index');
const controllersDenunciante = require('./src/controllers/denunciante/index');
const controllersDenuncias = require('./src/controllers/denuncias/index');
const controllersOrgInst = require('./src/controllers/orgaoInstituiçao/index');
const controllersUsu = require('./src/controllers/usuario/index');
const routes = express.Router();

routes.get("/", controllersUsu.raiz);   
routes.post("/teste", controllersUsu.testeCriarUsuario);

 

module.exports = routes;

const axios = require('axios');

const dados = {
    usu_cod: '4',
    usu_nome: 'testePOST',
    usu_email: 'testePOST@gmail.com',
    usu_senha: 'post123',
    usu_tel: '2324-9233'

};

axios.post('http://localhost:3344/teste', dados).then((response) => {
    console.log('REGISTRO ENVIADO ');
}).catch((error) => {
    console.error(error);
});
