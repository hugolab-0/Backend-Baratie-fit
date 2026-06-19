// Import das dependências
const express = require('express')

// Cria um objeto de rota
const router = express.Router()

const controllerTipoRefeicao = require('../../controller/tipo_refeicao/controller_tipo_refeicao.js')

// Endpoint para listar todos os Tipos de Refeição (dado estático)
router.get('/', async function (request, response) {

    let result = await controllerTipoRefeicao.listarTipoRefeicao()

    response.status(result.status_code)
    response.json(result)
})

module.exports = router
