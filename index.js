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
// defined model for API
const requireModel = require('./customer')

// defined route root - GET
router.get('/', (req, res, next) => res.json({
    message: 'Rota raiz funcionando: com Express e Sequelize!'
}))

// register customer in database - C - CREATE (C-r-u-d) - POST
router.post('/clientes', (req, res, next) => {
    const nome = req.body.nome.substring(0, 150)
    const cpf = req.body.cpf.substring(0, 11)
    const atributes = {
        nome: nome,
        cpf: cpf
    }
    registerModel(requireModel, atributes, res)
})

// defined route customers and search customer for id - R - READ (c-R-u-d) - GET
router.get('/clientes/:id?', (req, res, next) => {
    const id = parseInt(req.params.id) // validate data and cleaned data ???
    findAllOrByPkModel(requireModel, id, res)
})

// // update data customer in database
// router.patch('/clientes/:id', (req, res, next) => {
//     const id = parseInt(req.params.id)
//     const nome = req.body.nome.substring(0, 150)
//     const cpf = req.body.cpf.substring(0, 11)
//     execSQLQuery(`UPDATE clientes SET nome='${nome}', cpf='${cpf}' WHERE id=${id}`, res)
// })

// // delete customer for id
// router.delete('/clientes/:id', (req, res, next) => {
//     const id = req.params.id
//     execSQLQuery('DELETE FROM clientes WHERE id=' + parseInt(id), res)
// })

app.use('/', router)

// launch sever in port default
app.listen(portApp)
console.log(`API funcionando: http://localhost:${portApp}`)

// function insert register in model target in parameter requireModel with your object atributes.
// Suit for insert register any model
async function registerModel(requireModel, atributes, res) {
    const Model = requireModel
    try {
        const resultado = await Model.create(atributes)
        res.json(resultado)
        console.log(resultado) // can be remove
    } catch (error) {
        res.json(error)
        console.log(error) // can be remove
    }
}

// function for search register any model. Suit search any model
async function findAllOrByPkModel(requireModel, pk, res) {
    const Model = requireModel
    let resultado = null
    try {
        if (pk)
            resultado = await Model.findByPk(pk)
        else
            resultado = await Model.findAll()

        res.json(resultado)
        console.log(resultado) // can be remove
    } catch (error) {
        res.json(error)
        console.log(error) // can be remove
    }
}