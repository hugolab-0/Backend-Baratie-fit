/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle de rotas do nivel de acesso.
 * Data: 15/06/2026
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
const controllerNivelAcesso  = require("../controller/nivel_acesso/controller_nivel_acesso.js")


/* CRUD DA TABELA DO NIVEL DE ACESSO*/

//listar todas os niveis de acesso
router.get("/", async function(request, response){

    //fazendo requisição
    let result = await controllerNivelAcesso.listarNivelAcesso()

    //enviando resposta
    response.status(result.status_code)
    response.json(result)

})

//buscasr um nivel de acesso pelo id
router.get("/:id", async function(request, response){

    //recebendo o id
    let idNivelAcesso = request.params.id

    //enviando para o banco
    let result = await controllerNivelAcesso.buscarNivelAcesso(idNivelAcesso)

    //enviando resposta
    response.status(result.status_code)
    response.json(result)
})


//exportando o router para ser utilizado no arquivo principal da API
module.exports = router