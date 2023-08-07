const express = require('express');
const routes = require('./routes');
const cors = require('cors');
//const mysql = require("mysql"); 


const app = express();


const corsOptions = {
    origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

app.listen(3344, () => {
    console.log("servidor online na 3344");
});







//app.get GET - puxar valores, requisições
// app.post POST - enviar, fazer solicitações
//app.delete DELETE - deletar
//app.put PUT - editar 

/*
app.get('/', (req, res) => { // teste se está inserindo dados nas tabelas
    let SQL = "INSERT INTO usuario (usu_nome) VALUES ('usuarioTeste2')";
    res.send('Resposta do servidor');
    
    bancoTeste.query(SQL, (err, result) => {
        console.log(err);   
    })    
}) 
*/