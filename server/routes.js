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
