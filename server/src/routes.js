const express = require('express'); 
const multer = require('multer');


const controllersAcomp = require('../src/controllers/acompanhamento/index');
const controllersAdm = require('../src/controllers/administrador/index');
const controllersAva = require('../src/controllers/avaliaçao/index');
const controllersBairro = require('../src/controllers/bairro/index');
const controllersComen = require('../src/controllers/comentarios/index');
const controllersDenunciante = require('../src/controllers/denunciante/index');
const controllersDenuncias = require('../src/controllers/denuncias/index');
const controllersOrgInst = require('../src/controllers/orgaoInstituiçao/index');
const controllersUsu = require('../src/controllers/usuario/index');

const routes = express.Router();


//usuario
routes.get("/", controllersUsu.raiz);   
routes.post("/criarUsu", controllersUsu.CriarUsuario);

//denuncia
routes.get("/", controllersDenuncias.raiz);
routes.post("/criarDenuncia", controllersDenuncias.criarDenuncia);
 
//bairro
routes.get("/", controllersBairro.raiz);
routes.post("/buscarBairro", controllersBairro.buscarBairro);

//usuario denunciante
routes.get("/", controllersDenunciante.raiz);
routes.post("/criarDenunciante", controllersDenunciante.usuDenunciante);

module.exports = routes;
 


