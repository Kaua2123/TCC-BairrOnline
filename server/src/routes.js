const express = require('express'); 
const multer = require('multer');
const uploadMiddleware = require('./uploadMiddleware');


const controllersAcomp = require('../src/controllers/acompanhamento/index');
const controllersAdm = require('../src/controllers/administrador/index');
const controllersAva = require('../src/controllers/avaliaçao/index');
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
routes.post("/criarDenuncia", uploadMiddleware.single('den_img'), controllersDenuncias.criarDenuncia);
routes.get("/cardDenuncia", controllersDenuncias.cardDenuncia);
routes.delete("/deleteDenuncia/:cod", controllersDenuncias.deleteDenuncia);
routes.put("/updateDenuncia/:cod", controllersDenuncias.updateDenuncia);
 


//usuario denunciante
routes.get("/", controllersDenunciante.raiz);
routes.post("/criarDenunciante", controllersDenunciante.usuDenunciante);

//comentarios
routes.get("/", controllersComen.raiz);
routes.post("/criarComent", controllersComen.criarComentario);
routes.get("/cardComent", controllersComen.cardCom);
routes.delete("deleteComent", controllersComen.deleteComentario);
routes.put("updateComent", controllersComen.updateComentario);

module.exports = routes;
 


