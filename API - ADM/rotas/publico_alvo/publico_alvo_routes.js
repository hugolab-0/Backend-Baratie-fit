// Import das dependências
const express = require('express')

// Cria um objeto de rota
const router = express.Router()

const controllerPublicoAlvo = require('../../controller/publico_alvo/controller_publico_alvo.js')

// Endpoint para listar todos os Públicos Alvo (dado estático)
router.get('/', async function (request, response) {

    let result = await controllerPublicoAlvo.listarPublicoAlvo()

    response.status(result.status_code)
    response.json(result)
})

module.exports = router
