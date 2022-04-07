// function self-execute - create table customers (clientes) case not exist
(async () => {
    const database = require('./db')
    const Cliente = require('./customer')

    try {
        const resultado = await database.sync()
        console.log(resultado)
    } catch (error) {
        console.log(error)
    }
})()

// imports need for app
const express = require('express')
const bodyParser = require('body-parser')
// create instance app express
const app = express()
// ports default for app
const portApp = 3000


// settings body-parser of app for get POST lest late
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// defined router and routes
const router = express.Router()

// defined route root - GET
router.get('/', (req, res, next) => res.json({
    message: 'Rota raiz funcionando: com Express e Sequelize!'
}))

// // defined route customers and search customer for id - GET 
// sqlAllCustomers = 'SELECT id, nome, cpf FROM clientes'
// router.get('/clientes/:id?', (req, res, next) => {
//     const id = req.params.id
//     let sqlQry = ''
//     sqlQry = (id) ? sqlAllCustomers + ' WHERE id=' + parseInt(id) : sqlAllCustomers
//     execSQLQuery(sqlQry, res)
// })

// // delete customer for id
// router.delete('/clientes/:id', (req, res, next) => {
//     const id = req.params.id
//     execSQLQuery('DELETE FROM clientes WHERE id=' + parseInt(id), res)
// })

// register customer in database - C - CREATE (C-r-u-d)
// router.post('/clientes', (req, res, next) => {
//     const nome = req.body.nome.substring(0, 150)
//     const cpf = req.body.cpf.substring(0, 11)
//     execSQLQuery(`INSERT INTO clientes(nome, cpf) VALUE ('${nome}', '${cpf}')`, res)
// })

// // update data customer in database
// router.patch('/clientes/:id', (req, res, next) => {
//     const id = parseInt(req.params.id)
//     const nome = req.body.nome.substring(0, 150)
//     const cpf = req.body.cpf.substring(0, 11)
//     execSQLQuery(`UPDATE clientes SET nome='${nome}', cpf='${cpf}' WHERE id=${id}`, res)
// })

app.use('/', router)

// launch sever in port default
app.listen(portApp)
console.log(`API funcionando: http://localhost:${portApp}`)