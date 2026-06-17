/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle de rotas da tabela intermediária de refeição e restricao.
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
const controllerRefeicaoRestricao  = require("../controller/refeicao_restricao/controller_refeicao_restricao.js")


/* CRUD DA TABELA INTERMEDIÁRIA DE REFEIÇÃO E RESTRICAO */

//listar todas os dados da tabela de refeição e restricao
router.get("/", async function(request, response){

    //fazendo requisição
    let result = await controllerRefeicaoRestricao.listarRefeicaoRestricao()

    //enviando resposta
    response.status(result.status_code)
    response.json(result)

})

//buscasr um dado pelo id
router.get("/:id", async function(request, response){

    //recebendo o id
    let idRefeicaoRestricao = request.params.id

    //enviando para o banco
    let result = await controllerRefeicaoRestricao.buscarRefeicaoRestricao(idRefeicaoRestricao)

    //enviando resposta
    response.status(result.status_code)
    response.json(result)
})


//exportando o router para ser utilizado no arquivo principal da API
module.exports = router