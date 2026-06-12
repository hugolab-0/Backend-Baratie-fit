/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle de rotas dos enquadramentos.
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

//importando controller referente aos publicos alvos, para pode enviar os dados para serem processados
const controllerEnquadramento  = require("../controller/enquadramento/controller_enquadramento.js")


/* CRUD DA TABELA DAS CATEGORIAS DE ENQUADRAMENTO */

//listar todas os enquadramentos
router.get("/", async function(request, response){

    //fazendo requisição
    let result = await controllerEnquadramento.listarEnquadramento()

    //enviando resposta
    response.status(result.status_code)
    response.json(result)

})

//buscasr um enquadramento
router.get("/:id", async function(request, response){

    //recebendo o id
    let idEnquadramento = request.params.id

    //enviando para o banco
    let result = await controllerEnquadramento.buscarEnquadramentoId(idEnquadramento)

    //enviando resposta
    response.status(result.status_code)
    response.json(result)
})


//exportando o router para ser utilizado no arquivo principal da API
module.exports = router