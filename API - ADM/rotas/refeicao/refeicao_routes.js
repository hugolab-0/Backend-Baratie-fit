//Import das dependências para criar a API
// import do express
const express = require('express')


// cria um objeto de rota
const router = express.Router()

const path = require('path')

const upload = require('../../uploads/middleware_upload.js')

// Middleware para tratamento de JSON
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controllerRefeicao = require('../../controller/refeição/refeicao_controller.js')

//Endpoint para cadastrar uma nova Refeição (com upload de imagem)
router.post('/', upload.single('img'), async function(request, response) {
    let dados = request.body

    if(request.file){
        dados.img = request.file.filename
    }

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
router.put('/:id', upload.single('img'), async function(request, response){

    let dados = request.body
    dados.id = request.params.id
 
    if (request.file) {
        dados.img = request.file.filename
    }
 
    let result = await controllerRefeicao.atualizarRefeicao(dados)
 
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