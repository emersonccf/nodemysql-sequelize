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
const requireModelCustomer = require('./customer')

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
    registerModel(requireModelCustomer, atributes, res)
})

// defined route customers and search customer for id - R - READ (c-R-u-d) - GET
router.get('/clientes/:id?', (req, res, next) => {
    const id = parseInt(req.params.id) // validate data and cleaned data ???
    findAllOrByPkModel(requireModelCustomer, id, res)
})

// update data customer in database - U - READ (c-r-U-d) - PATCH
router.patch('/clientes/:id', (req, res, next) => {
    const id = parseInt(req.params.id) // validate data and cleaned data ???
    const nome = req.body.nome.substring(0, 150)
    const cpf = req.body.cpf.substring(0, 11)
    dataAtributes = {
        nome: nome,
        cpf: cpf
    }
    updateRegisterModel(requireModelCustomer, id, dataAtributes, res)
})

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
async function registerModel(Model, atributes, res) {
    let result = null
    try {
        result = await Model.create(atributes)
        res.json(result)
        console.log(result) // can be remove
    } catch (error) {
        res.json(error)
        console.log(error) // can be remove
    }
    return result
}

// function for search register any model. Suit search any model
async function findAllOrByPkModel(Model, pk, res) {
    let result = null
    try {
        if (pk)
            result = await Model.findByPk(pk)
        else
            result = await Model.findAll()

        console.log(result)

        res.json(result)
        console.log(result) // can be remove
    } catch (error) {
        res.json(error)
        console.log(error) // can be remove
    }
    return result
}

// function for search update of register any model. Suit update any model
async function updateRegisterModel(Model, pk, dataAtributes, res) {
    let result = null
    let register = await Model.findByPk(pk)
    try {
        register = updateValuesAtributes(register, dataAtributes)
        if (register)
            result = await register.save()
        else
            result = {}
        res.json(result)
        console.log(result) // can be remove
    } catch (error) {
        res.json(error)
        console.log(error) // can be remove
    }
    return result
}

// update values between objects with same properties
function updateValuesAtributes(objectTarget, objectResource) {
    // object Resource must have the same attribute key names as objectTarget
    if (objectTarget)
        for (const property in objectResource) {
            objectTarget[property] = objectResource[property]
        }
    return objectTarget
}