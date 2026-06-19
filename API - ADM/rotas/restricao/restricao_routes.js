// Import das dependências
const express = require('express')

// Cria um objeto de rota
const router = express.Router()

const controllerRestricao = require('../../controller/restricao/controller_restricao.js')

// Endpoint para listar todas as Restrições (dado estático)
router.get('/', async function (request, response) {

    let result = await controllerRestricao.listarRestricao()

    response.status(result.status_code)
    response.json(result)
})

module.exports = router
