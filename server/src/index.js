const express = require('express');
const routes = require('../routes');
//const mysql = require("mysql"); 


const app = express();
app.use(express.json());
app.use(routes);

app.listen(3301, () => {
    console.log("servidor online");
});


const knex = require('../src/database/banco');
const select = knex('usuario').select('*');



knex.select().from('usuario')
  .then(data => {
    if (data.length > 0) {
      console.log(data);
    } else {
      console.log('Nenhum registro encontrado.');
    }
  })
  .catch(e => {
    console.log(e);
  })
  .finally(() => {
    knex.destroy();
  });

console.log(select.toString());

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