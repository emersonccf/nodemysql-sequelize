// imports need for app
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const pw = require('./env')
const {
    route
} = require('express/lib/router')
// create instance app express
const app = express()
// ports default for app e bd
const portApp = 3000
const host = 'localhost'
const portBD = 3306
const user = 'root'
const database = 'nodemysql'

// settings body-parser of app for get POST lest late
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// defined router and routes
const router = express.Router()

// defined route root - GET
router.get('/', (req, res, next) => res.json({
    message: 'Rota raiz funcionando!'
}))

// defined route customers and search customer for id - GET 
sqlAllCustomers = 'SELECT id, nome, cpf FROM clientes'
router.get('/clientes/:id?', (req, res, next) => {
    const id = req.params.id
    let sqlQry = ''
    sqlQry = (id) ? sqlAllCustomers + ' WHERE id=' + parseInt(id) : sqlAllCustomers
    execSQLQuery(sqlQry, res)
})

// delete customer for id
router.delete('/clientes/:id', (req, res, next) => {
    const id = req.params.id
    execSQLQuery('DELETE FROM clientes WHERE id=' + parseInt(id), res)
})

// register customer in database
router.post('/clientes', (req, res, next) => {
    const nome = req.body.nome.substring(0, 150)
    const cpf = req.body.cpf.substring(0, 11)
    execSQLQuery(`INSERT INTO clientes(nome, cpf) VALUE ('${nome}', '${cpf}')`, res)
})

// update data customer in database
router.patch('/clientes/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const nome = req.body.nome.substring(0, 150)
    const cpf = req.body.cpf.substring(0, 11)
    execSQLQuery(`UPDATE clientes SET nome='${nome}', cpf='${cpf}' WHERE id=${id}`, res)
})

app.use('/', router)

// launch sever in port default
app.listen(portApp)
console.log(`API funcionando: http://localhost:${portApp}`)

function execSQLQuery(sqlQry, res) {
    // create connection
    const connection = mysql.createConnection({
        host: host,
        port: portBD,
        user: user, // defined here your user
        password: pw.passwordBD, // use here your password 
        database: database
    })

    connection.query(sqlQry, function (error, result, fields) {
        if (error)
            res.json(error)
        else
            res.json(result)
        connection.end()
        console.log(`Consulta [ ${sqlQry} ] foi executada.`)
    })
}