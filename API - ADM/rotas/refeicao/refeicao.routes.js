//Import das dependências para criar a API
// import do express
const express = require('express')

// cria um objeto de rota
const router = express.Router()

// Middleware para tratamento de JSON
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controllerRefeicao = require('../../controller/refeição/refeicao_controller.js')

//Endpoint para cadastrar uma nova Refição
router.post('/', bodyParserJSON, async function(request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerRefeicao.inserirRefeicao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para listar todos as refeições criados
router.get('/', async function(request, response) {

    let result = await controllerRefeicao.listarRefeicoes()

    response.status(result.status_code)
    response.json(result)
    
})

//Endpoint para buscar uma refeição via ID
router.get('/:id', async function(request, response) {
    //recebe o id via Parametro
    let id = request.params.id

    let result = await controllerRefeicao.buscarRefeicao(id)
   
    response.status(result.status_code)
    response.json(result)
})

//Endepoint para atualizar uma Refeição
router.put('/:id', bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let id = request.params.id

    let dados = request.body

    let result = await controllerRefeicao.atualizarRefeicao(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
    
})

//Endepoint para deletar uma refeição
router.delete('/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerRefeicao.excluirRefeicao(id)

    response.status(result.status_code)
    response.json(result)
})


module.exports = router