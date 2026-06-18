/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle de rotas das refeições.
 * Data: 17/06/2026
 * Autor: Lucas Dias Brandão Kolle
 * Versão: 1.0.06.26
 *******************************************************************************************************************************************************************************************/


//importando o express
const express       = require("express")
const bodyParser    = require("body-parser")

//criando um objeto para manipular dados do body da API em formato Json
const bodyParserJSON = bodyParser.json()

//cria um objeto de rota para o arquivo
const router = express.Router()

//importando controller referente aos publicos alvos, para pode enviar os dados para serem processados
const controllerRefeicao  = require("../controller/refeicao/controller_refeicao.js")


/* CRUD DA TABELA DAS REFEIÇÕES */

//listar todas as refeições
router.get("/", async function(request, response){

    //fazendo requisição
    let result = await controllerRefeicao.listarRefeicao()

    //enviando resposta
    response.status(result.status_code)
    response.json(result)

})

//pesquisar uma refeição pelo nome
router.get("/pesquisar", bodyParserJSON, async function(request, response){

    //recebendo o nome
    let nomeRefeicao = request.body

    //enviando para o banco
    let result = await controllerRefeicao.buscarRefeicaoNome(nomeRefeicao.nome)

    //enviando resposta
    response.status(result.status_code)
    response.json(result)
})

//buscasr uma refeição pelo id
router.get("/:id", async function(request, response){

    //recebendo o id
    let idRefeicao = request.params.id

    //enviando para o banco
    let result = await controllerRefeicao.buscarRefeicao(idRefeicao)

    //enviando resposta
    response.status(result.status_code)
    response.json(result)
})



//exportando o router para ser utilizado no arquivo principal da API
module.exports = router