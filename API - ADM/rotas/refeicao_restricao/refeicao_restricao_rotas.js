// Import das dependências para criar a API
const express = require('express')

// Cria um objeto de rota
const router = express.Router()

// Middleware para tratamento de JSON
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controllerRefeicaoRestricao = require('../../controller/refeição/refeicao_restricao_controller.js')

// Endpoint para cadastrar um novo vínculo de Refeição Restrição
router.post('/', bodyParserJSON, async function(request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerRefeicaoRestricao.inserirRefeicaoRestricao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para listar todos os vínculos de Refeição Restrição
router.get('/', async function(request, response) {

    let result = await controllerRefeicaoRestricao.listarRefeicaoRestricao()

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para buscar vínculos pelo ID da Refeição
router.get('/refeicao/:id_refeicao', async function(request, response) {
    let id_refeicao = request.params.id_refeicao

    let result = await controllerRefeicaoRestricao.buscarRefeicaoRestricaoPorRefeicao(id_refeicao)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para buscar vínculos pelo ID da Restrição
router.get('/restricao/:id_restricao', async function(request, response) {
    let id_restricao = request.params.id_restricao

    let result = await controllerRefeicaoRestricao.buscarRefeicaoRestricaoPorRestricao(id_restricao)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para deletar um vínculo de Refeição Restrição
router.delete('/:id_refeicao/:id_restricao', async function(request, response) {
    let id_refeicao = request.params.id_refeicao
    let id_restricao = request.params.id_restricao

    let result = await controllerRefeicaoRestricao.excluirRefeicaoRestricao(id_refeicao, id_restricao)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router