//Import das dependências para criar a API
// import do express
const express = require('express')

// cria um objeto de rota
const router = express.Router()

// Middleware para tratamento de JSON
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controllerADM = require('../../controller/adm/controller_adm.js')

//Endpoint para cadastrar um novo ADM
router.post('/', bodyParserJSON, async function(request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerADM.inserirADM(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para listar todos os ADM
router.get('/', async function(request, response) {

    let result = await controllerADM.listarADM()

    response.status(result.status_code)
    response.json(result)
    
})

//Endpoint para buscar um ADM via ID
router.get('/:id', async function(request, response) {
    //recebe o id via Parametro
    let id = request.params.id

    let result = await controllerADM.buscarADM(id)
   
    response.status(result.status_code)
    response.json(result)
})

//Endepoint para atualizar um ADM
router.put('/:id', bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerADM.atualizarADM(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
    
})

//Endepoint para deletar um ADM
router.delete('/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerADM.excluirADM(id)

    response.status(result.status_code)
    response.json(result)
})


module.exports = router