/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle de rotas das restrições.
 * Data: 12/06/2026
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

//importando os arquivos da controller, para pode enviar os dados para serem processados
const controllerRestricao = require("../controller/restricao/controller_restricao.js")


/* CRUD DA TABELA DE RESTRIÇÕES */

//listar todos as restrições
router.get("/", async function(request, response){

    //fazendo requisição
    let result = await controllerRestricao.listarRestricao()

    //enviando resposta
    response.status(result.status_code)
    response.json(result)

})

//buscasr uma restrição pelo id
router.get("/:id", async function(request, response){

    //recebendo o id
    let idRestricao = request.params.id

    //enviando para o banco
    let result = await controllerRestricao.buscarRestricaoId(idRestricao)

    //enviando resposta
    response.status(result.status_code)
    response.json(result)
})


//exportando o router para ser utilizado no arquivo principal da API
module.exports = router