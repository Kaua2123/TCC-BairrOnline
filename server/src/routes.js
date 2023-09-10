const express = require('express'); 



const controllersAcomp = require('../src/controllers/acompanhamento/index');
const controllersAva = require('../src/controllers/avaliaçao/index');
const controllersComen = require('../src/controllers/comentarios/index');
const controllersDenuncias = require('../src/controllers/denuncias/index');
const controllersUsu = require('../src/controllers/usuario/index');
const controllersNotificacoes = require('../src/controllers/notificações');

const routes = express.Router();


//usuario
routes.get("/", controllersUsu.raiz);   
routes.post("/criarUsu", controllersUsu.CriarUsuario);
routes.post("/logarUsu", controllersUsu.logarUsuario);

//denuncia
routes.get("/", controllersDenuncias.raiz);
routes.post("/criarDenuncia", controllersDenuncias.criarDenuncia);
routes.get("/cardDenuncia", controllersDenuncias.cardDenuncia);
routes.delete("/deleteDenuncia/:cod", controllersDenuncias.deleteDenuncia);
routes.delete("/deleteTodasDenuncias", controllersDenuncias.deleteTodasDenuncias);
routes.put("/updateDenuncia/:cod", controllersDenuncias.updateDenuncia);
routes.post("/uparImagem/:cod", controllersDenuncias.uparImagem);
routes.get("/retornaImagem/:filename", controllersDenuncias.retornaImagem);

//comentarios
routes.get("/", controllersComen.raiz);
routes.post("/criarComent", controllersComen.criarComentario);
routes.delete("deleteComent", controllersComen.deleteComentario);
routes.put("updateComent", controllersComen.updateComentario);
routes.get("/buscarComentario", controllersComen.buscarComentario);

//acompanhamento
routes.post("/criarAcompanhamento", controllersAcomp.criarAcompanhamento);
routes.get("getAcompanhamento", controllersAcomp.getAcompanhamentos);

//notificações
routes.get("/", controllersNotificacoes.raiz);

module.exports = routes;