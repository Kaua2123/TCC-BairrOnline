const express = require("express"); //chamando o modulo express
const app = express(); //executando express
const banco = require("mysql"); 

app.get('/', (req, res) => {
    res.send("xd"); // mensagem retornada ao acessar a raíz do servidor /
}) 

//req tudo que entrará
//res tudo que sai, resultado

app.listen(3001, () => {
    console.log("rodando servidor");
});

//app.get GET - puxar valores, requisições
// app.post POST - enviar, fazer solicitações
//app.delete DELETE - deletar
//app.put PUT - editar 