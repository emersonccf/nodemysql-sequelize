// defined use database with import of module mysql 
const mysql = require('mysql')
const pw = require('./env') // file settings passwords

// create connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root', // defined here your user
    password: pw.passwordBD, // use here your password 
    database: 'nodemysql'
})

// establish connection with database MySql   
connection.connect(function (err) {
    if (err) return console.log(err)
    console.log('Conexão realizada com sucesso')
    createTable(connection)
})

console.log('Aguarde...')

// create table
function createTable(conn) {

    const sql = "CREATE TABLE IF NOT EXISTS clientes (" +
        "id int NOT NULL AUTO_INCREMENT," +
        "nome varchar(150) NOT NULL," +
        "cpf char(11) NOT NULL," +
        "PRIMARY KEY (id)" +
        ");";

    conn.query(sql, function (error, results, fields) {
        if (error) return console.log(error);
        console.log('Tabela clientes criada com sucesso!');
        addRows(connection)
        conn.end() // close connection
    });
}

// load registers
function addRows(conn) {
    const sql = "INSERT INTO clientes(nome, cpf) VALUES ?";
    const values = [
        ['Carlos Almeida', '12345678901'],
        ['Ana Santos', '09876543210'],
        ['Emerson Ferreira', '12312312399']
    ];
    conn.query(sql, [values], function (error, results, fields) {
        if (error) return console.log(error);
        console.log('Registros adicionados com sucesso!');
    });
}