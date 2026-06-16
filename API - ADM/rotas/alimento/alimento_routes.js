// import do express
const express = require('express')

// cria um objeto de rota
const router = express.Router()

// Middleware para tratamento de JSON
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()


const controllerAlimento = require('../../controller/alimento/controller_alimento.js')

//Endpoint para criar um alimento
router.post('/', bodyParserJSON, async function(request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerAlimento.inserirAlimento(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para listar todos os alimentos criados
router.get('/', async function(request, response) {

    let result = await controllerAlimento.listarAlimento()

    response.status(result.status_code)
    response.json(result)
    
})

//Endpoint para buscar um alimento via ID
router.get('/:id', async function(request, response) {
    //recebe o id via Parametro
    let id = request.params.id

    let result = await controllerAlimento.buscarAlimento(id)
   
    response.status(result.status_code)
    response.json(result)
})

//Endepoint para atualizar Alimento
router.put('/:id', bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerAlimento.atualizarAlimento(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
    
})

//Endepoint para deletar um alimento
router.delete('/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerAlimento.excluirAlimento(id)

    response.status(result.status_code)
    response.json(result)
})


module.exports = router