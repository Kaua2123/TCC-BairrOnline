const express = require("express"); //chamando o modulo express
const app = express(); //executando express
const mysql = require("mysql"); 

const bancoTeste = mysql.createPool({
    host: "localhost", 
    user: "root",
    password: "",
    database: "bairronline",
})


/*
app.get('/', (req, res) => { // teste se está inserindo dados nas tabelas
    let SQL = "INSERT INTO usuario (usu_nome) VALUES ('usuarioTeste2')";
    res.send('Resposta do servidor');
    
    bancoTeste.query(SQL, (err, result) => {
        console.log(err);   
    })    
}) 
*/

app.get("/", (req, res) => {
    res.send("Resposta do servidor")
})

//req tudo que entrará
//res tudo que sai, resultado

app.use(express.json());

app.listen(3001, () => {
    console.log("servidor online");
});

//app.get GET - puxar valores, requisições
// app.post POST - enviar, fazer solicitações
//app.delete DELETE - deletar
//app.put PUT - editar 