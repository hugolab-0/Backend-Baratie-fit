/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle de rotas da tabela de adm.
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
const controllerAdm  = require("../controller/adm/controller_adm.js")


/* CRUD DA TABELA DE ADM */

//listar todas os dados da tabela de adm
router.get("/", async function(request, response){

    //fazendo requisição
    let result = await controllerAdm.listarAdm()

    //enviando resposta
    response.status(result.status_code)
    response.json(result)

})

//buscasr um adm pelo id
router.get("/:id", async function(request, response){

    //recebendo o id
    let idAdm = request.params.id

    //enviando para o banco
    let result = await controllerAdm.buscarAdm(idAdm)

    //enviando resposta
    response.status(result.status_code)
    response.json(result)
})


//exportando o router para ser utilizado no arquivo principal da API
module.exports = router