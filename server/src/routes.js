const express = require('express');
const autentica = require('./autenticaToken');


const controllersAcomp = require('../src/controllers/acompanhamento/index');
const controllersAdm = require('../src/controllers/administrador/index');
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
routes.get("/getUsuarios", controllersUsu.getUsuarios);
routes.get("/getInstituicoes", controllersUsu.getInstituicoes);

//denuncia
//chamando o middleware "autentica" nas rotas protegidas, que so usuarios podem acessar
routes.get("/", controllersDenuncias.raiz);
routes.post("/criarDenuncia", autentica, controllersDenuncias.criarDenuncia);
routes.get("/getDenuncia", controllersDenuncias.getDenuncia);
routes.get("/getDenunciaLogado", autentica, controllersDenuncias.getDenunciaLogado);
routes.delete("/deleteDenuncia/:cod", autentica, controllersDenuncias.deleteDenuncia);
routes.delete("/deleteTodasDenuncias", autentica, controllersDenuncias.deleteTodasDenuncias);
routes.get("/getDenunciaExcluida", autentica, controllersDenuncias.getDenunciaExcluida);
routes.post("/reverterDenunciaExcluida/:cod", autentica, controllersDenuncias.reverterDenunciaExcluida)
routes.put("/updateDenuncia/:cod", autentica, controllersDenuncias.updateDenuncia);
routes.post("/uparImagem/:cod", autentica, controllersDenuncias.uparImagem);
routes.get("/retornaImagem/:filename", controllersDenuncias.retornaImagem);

//comentarios
routes.get("/", controllersComen.raiz);
routes.post("/criarComent", controllersComen.criarComentario);
routes.delete("/deleteComent", controllersComen.deleteComentario);
routes.put("updateComent", controllersComen.updateComentario);
routes.get("/buscarComentario", controllersComen.buscarComentario);

//acompanhamento
routes.post("/criarAcompanhamento", controllersAcomp.criarAcompanhamento);
routes.get("/getAcompanhamento", controllersAcomp.getAcompanhamentos);

//notificações
routes.get("/", controllersNotificacoes.raiz);
routes.post("/msgNotificacao", autentica, controllersNotificacoes.msgNotificacao);
routes.get("/getNotificacoes",  autentica, controllersNotificacoes.getNotificacoes);
routes.delete("/deleteNotificacoes/:cod", autentica, controllersNotificacoes.deleteNotificacoes);
routes.put("/notificacaoLida/:cod", autentica, controllersNotificacoes.notificacaoLida);

module.exports = routes;
