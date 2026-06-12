//Import das dependências para criar a API
// import do express
const express = require('express')

// cria um objeto de rota
const router = express.Router()

// Middleware para tratamento de JSON
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controllerRefeicao = require('../../controller/refeição/refeicao_controller.js')

router.post('/', bodyParserJSON, async function(request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerRefeicao.insertRefeicao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router