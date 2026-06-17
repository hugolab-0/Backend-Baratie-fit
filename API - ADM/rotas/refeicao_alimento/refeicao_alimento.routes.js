// Import das dependências para criar a API
const express = require('express')

// Cria um objeto de rota
const router = express.Router()

// Middleware para tratamento de JSON
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controllerRefeicaoAlimento = require('../../controller/refeição/refeicao_alimento_controller.js')

// Endpoint para cadastrar um novo vínculo de Refeição Alimento
router.post('/', bodyParserJSON, async function(request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerRefeicaoAlimento.inserirRefeicaoAlimentacao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para listar todos os vínculos de Refeição Alimento
router.get('/', async function(request, response) {

    let result = await controllerRefeicaoAlimento.selecionarTodosRefeicaoAlimentacao()

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para buscar um vínculo de Refeição Alimento pelo seu próprio ID
router.get('/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerRefeicaoAlimento.selecionarPorIdRefeicaoAlimentacao(id)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para buscar todos os alimentos vinculados a uma Refeição (filtro por id_refeicao)
router.get('/refeicao/:id_refeicao', async function(request, response) {
    let id_refeicao = request.params.id_refeicao

    let result = await controllerRefeicaoAlimento.selecionarPorIdRefeicaoDaRefeicaoAlimentacao(id_refeicao)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para atualizar um vínculo de Refeição Alimento
router.put('/:id', bodyParserJSON, async function(request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    dados.id = request.params.id

    let result = await controllerRefeicaoAlimento.atualizarRefeicaoAlimentacao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para deletar um vínculo de Refeição Alimento pelo seu próprio ID
router.delete('/:id', async function(request, response) {
    let id = request.params.id

    let result = await controllerRefeicaoAlimento.excluirRefeicaoAlimentacao(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router