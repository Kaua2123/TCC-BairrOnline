const express = require('express');
const autentica = require('./autenticaToken');


const controllersAcomp = require('../src/controllers/acompanhamento/index');
const controllersSubtarefas = require('./controllers/subtarefa/index');
const controllersComen = require('../src/controllers/comentarios/index');
const controllersDenuncias = require('../src/controllers/denuncias/index');
const controllersUsu = require('../src/controllers/usuario/index');
const controllersNotificacoes = require('../src/controllers/notificações/index');

const routes = express.Router();


//usuario
routes.get("/", controllersUsu.raiz);
routes.post("/criarUsu", controllersUsu.CriarUsuario);
routes.post("/logarUsu", controllersUsu.logarUsuario);
routes.put("/updateUsuarios/:cod", autentica, controllersUsu.updateUsuarios);
routes.get("/getUsuarios", controllersUsu.getUsuarios);
routes.get("/getUsuarioLogado", autentica, controllersUsu.getUsuarioLogado);
routes.get("/getInstituicoes", controllersUsu.getInstituicoes);
routes.post("/imgPerfil/:cod", autentica, controllersUsu.imgPerfil);
routes.get("/retornaImgPerfil/:filename", controllersUsu.retornaImgPerfil);

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
routes.post("/curtirDenuncia", controllersDenuncias.curtirDenuncia);

//comentarios
routes.get("/", controllersComen.raiz);
routes.post("/criarComent", controllersComen.criarComentario);
routes.delete("/deleteComent", controllersComen.deleteComentario);
routes.put("updateComent", controllersComen.updateComentario);
routes.get("/buscarComentario", controllersComen.buscarComentario);

//acompanhamento
routes.post("/criarAcompanhamento", controllersAcomp.criarAcompanhamento);
routes.get("/getAcompanhamento", autentica, controllersAcomp.getAcompanhamentos);

//subtarefas
routes.post("/criarSubtarefa", autentica, controllersSubtarefas.criarSubtarefa);
routes.get("/getSubtarefa", autentica, controllersSubtarefas.getSubtarefa);
routes.delete("deleteSubtarefa", controllersSubtarefas.deleteSubtarefa);

//notificações
routes.get("/", controllersNotificacoes.raiz);
routes.post("/msgNotificacao", autentica, controllersNotificacoes.msgNotificacao);
routes.get("/getNotificacoes",  autentica, controllersNotificacoes.getNotificacoes);
routes.delete("/deleteNotificacoes/:cod", autentica, controllersNotificacoes.deleteNotificacoes);
routes.put("/notificacaoLida/:cod", autentica, controllersNotificacoes.notificacaoLida);


module.exports = routes;
