/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo controle de rotas das categorias dos alimentos.
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
const controllerCategoriaAlimento  = require("../controller/categoria_alimento/controller_categoria_alimento.js")


/* CRUD DA TABELA DAS CATEGORIAS DOS ALIMENTOS */

//listar todas as categorias de alimentos
router.get("/", async function(request, response){

    //fazendo requisição
    let result = await controllerCategoriaAlimento.listarCategoriaAlimento()

    //enviando resposta
    response.status(result.status_code)
    response.json(result)

})

//buscasr uma categoria de alimento pelo id
router.get("/:id", async function(request, response){

    //recebendo o id
    let idCategoriaAlimento = request.params.id

    //enviando para o banco
    let result = await controllerCategoriaAlimento.buscarCategoriaAlimento(idCategoriaAlimento)

    //enviando resposta
    response.status(result.status_code)
    response.json(result)
})


//exportando o router para ser utilizado no arquivo principal da API
module.exports = router