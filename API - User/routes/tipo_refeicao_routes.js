/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle de rotas dos tipos de refeições.
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
const controllerTipoRefeicao = require("../controller/tipo_refeicao/controller_tipo_refeicao.js")


/* CRUD DA TABELA DOS TIPOS DE REFEIÇÕES */

//listar todos os tipos de refeição
router.get("/", async function(request, response){

    //fazendo requisição
    let result = await controllerTipoRefeicao.listarTipoRefeicao()

    //enviando resposta
    response.status(result.status_code)
    response.json(result)

})

//buscasr um tipo de refeição pelo ID
router.get("/:id", async function(request, response){

    //recebendo o id
    let idTipoRefeicao = request.params.id

    //enviando para o banco
    let result = await controllerTipoRefeicao.buscarTipoRefeicaoId(idTipoRefeicao)

    //enviando resposta
    response.status(result.status_code)
    response.json(result)
})


//exportando o router para ser utilizado no arquivo principal da API
module.exports = router