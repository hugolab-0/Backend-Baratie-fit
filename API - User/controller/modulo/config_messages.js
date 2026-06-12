/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela configuração e padronização das mensagen da API.
 * Data: 12/06/2026
 * Autor: Lucas Dias Brandão Kolle
 * Versão: 1.0.06.26
 *******************************************************************************************************************************************************************************************/


/* CRIANDO CABEÇALHO GERAL DA API */
const DEFAULT_MESSAGE = {
    api_description: "API para alimentar o e-comerce da BaratieFit",
    development: "Lucas Dias Brandão Kolle",
    version: "1.0.06.26",
    status: Boolean,
    status_code: Number,
    response: {}
}

/* CRIANDO MENSAGENS DE ERRO DA API */

//mensagem de erro para requisição com dados incorretos
const ERROR_BAD_REQUEST = {
    status: false,
    status_code: 400,
    message: "Os dados enviados na requisição não estão corretos!"
}

//mensagem de erro interno da API para erro na modelagem de dados (MODEL)
const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: "Não foi possível processar a requição por conta de erro na API (Erro na modelagem de dados MODEL)."
}

//mensagem de erro interno da API para erro na manipulação de dados (CONTROLLER)
const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: "Não foi possível processar a requição por conta de erro na API (Erro na CONTROLLER)."
}

//mensagem de erro para requisição com formato de dados incorreto (Content-Type)
const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: "Não foi possível processar a requição pois o formato de dados aceito pela API é somente JSON."
}

//mensagem de erro para requisição com id não encontrado ou sem dados para retornar
const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: "Não foi encontrado nenhum dado para retorno."
}


/* CRIANDO MENSAGENS DE SUCESSO DA API */

//mensagem de sucesso para registro inserido com sucesso
const SUCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: "Registro inserido com sucesso!"
}

//mensagem de sucesso para registro inserido com sucesso, porém com alguns dados apresentando problemas
const SUCESS_CREATED_ITEM_WARNING = {
    status: true,
    status_code: 201,
    message: "Os dados principais foram inseridos com sucesso, porém alguns dados apresentaram problemas e não foram inseridos!"
}

//mensagem de sucesso para requisição processada com sucesso, porém sem retorno de dados (ex: delete)
const SUCESS_RESPONSE = {
    status: true,
    status_code: 200
}

//mensagem de sucesso para item excluído com sucesso
const SUCCESS_DELETED_ITEM = {
    status: true,
    status_code: 200,
    message: "Item excluído com sucesso!"
}

//mensagem de sucesso para item atualizado com sucesso
const SUCCESS_UPDATE_ITEM = {
    status: true,
    status_code: 200,
    message: "Item atualizado com sucesso"
}


//exportando as mensagens para serem utilizadas na controller
module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCESS_CREATED_ITEM,
    SUCESS_CREATED_ITEM_WARNING,
    SUCESS_RESPONSE,
    SUCCESS_DELETED_ITEM,
    SUCCESS_UPDATE_ITEM
}