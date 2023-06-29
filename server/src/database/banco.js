const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile['development']);

module.exports = knex;

const mysql = require("mysql");

const bancoTeste = mysql.createPool({
    host: "localhost", 
    user: "root",
    password: "",
    database: "bairronline",
})

