/***********************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelas regras de negócio (Controller) do CRUD de Refeição Alimento
 * Data: 2026-06-17
 * Autor: Geovane
 * Versão: 1.0
 * 
 **********************************************************************************************************/

//Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMessages.js');

//Import do arquivo DAO para fazer o CRUD de refeição alimento no banco de dados
const refeicaoAlimentacaoDAO = require('../../model/DAO/refeicao_alimento/refeicao_alimento.js');


// Função para inserir uma nova Refeição Alimento
const inserirRefeicaoAlimentacao = async function (refeicaoAlimentacao, contentType) {

    let message = JSON.parse(JSON.stringify(message_config));

    try {

        if (!String(contentType).includes('application/json')) {
            return message_config.ERROR_CONTENT_TYPE; // 415
        }

        let validar = validarRefeicaoAlimentacao(refeicaoAlimentacao);

        if (validar !== true) {
            return validar;
        }

        let result = await refeicaoAlimentacaoDAO.insertRefeicaoAlimento(refeicaoAlimentacao);

        if (result) {
            refeicaoAlimentacao.id = result;
            message.DEFAULT_MESSAGE.status = message_config.SUCESS_CREATED_ITEM.status;
            message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_CREATED_ITEM.status_code;
            message.DEFAULT_MESSAGE.message = message_config.SUCESS_CREATED_ITEM.message;
            message.DEFAULT_MESSAGE.response = refeicaoAlimentacao;

            return message.DEFAULT_MESSAGE;
        } else {
            message.DEFAULT_MESSAGE.status = message_config.ERROR_BAD_RESQUEST.status;
            message.DEFAULT_MESSAGE.status_code = message_config.ERROR_BAD_RESQUEST.status_code;
            message.DEFAULT_MESSAGE.message = message_config.ERROR_BAD_RESQUEST.message;

            return message.DEFAULT_MESSAGE;
        }

    } catch (error) {
        console.log(error);
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}


// Função para retornar todas as Refeições Alimento cadastradas
const selecionarTodosRefeicaoAlimentacao = async function () {

    let message = JSON.parse(JSON.stringify(message_config));

    try {

        let result = await refeicaoAlimentacaoDAO.selectAllRefeicaoAlimento();

        if (result && result.length > 0) {
            message.DEFAULT_MESSAGE.status = message_config.SUCESS_RESPONSE.status;
            message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_RESPONSE.status_code;
            message.DEFAULT_MESSAGE.response = result;

            return message.DEFAULT_MESSAGE;
        } else {
            message.DEFAULT_MESSAGE.status = message_config.ERROR_NOT_FOUND.status;
            message.DEFAULT_MESSAGE.status_code = message_config.ERROR_NOT_FOUND.status_code;
            message.DEFAULT_MESSAGE.message = message_config.ERROR_NOT_FOUND.message;

            return message.DEFAULT_MESSAGE;
        }

    } catch (error) {
        console.log(error);
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}


// Função para retornar uma Refeição Alimento filtrando pelo ID
const selecionarPorIdRefeicaoAlimentacao = async function (id) {

    let message = JSON.parse(JSON.stringify(message_config));

    try {

        if (id == undefined || isNaN(id) || Number(id) <= 0) {
            let errorMessage = JSON.parse(JSON.stringify(message_config.ERROR_BAD_RESQUEST));
            errorMessage.field = 'id';
            return errorMessage;
        }

        let result = await refeicaoAlimentacaoDAO.selectByIdRefeicaoAlimento(id);

        if (result && result.length > 0) {
            message.DEFAULT_MESSAGE.status = message_config.SUCESS_RESPONSE.status;
            message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_RESPONSE.status_code;
            message.DEFAULT_MESSAGE.response = result;

            return message.DEFAULT_MESSAGE;
        } else {
            message.DEFAULT_MESSAGE.status = message_config.ERROR_NOT_FOUND.status;
            message.DEFAULT_MESSAGE.status_code = message_config.ERROR_NOT_FOUND.status_code;
            message.DEFAULT_MESSAGE.message = message_config.ERROR_NOT_FOUND.message;

            return message.DEFAULT_MESSAGE;
        }

    } catch (error) {
        console.log(error);
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}


// Função para retornar todos os Alimentos de uma determinada Refeição (filtro por id_refeicao)
const selecionarPorIdRefeicaoDaRefeicaoAlimentacao = async function (id_refeicao) {

    let message = JSON.parse(JSON.stringify(message_config));

    try {

        if (id_refeicao == undefined || isNaN(id_refeicao) || Number(id_refeicao) <= 0) {
            let errorMessage = JSON.parse(JSON.stringify(message_config.ERROR_BAD_RESQUEST));
            errorMessage.field = 'id_refeicao';
            return errorMessage;
        }

        let result = await refeicaoAlimentacaoDAO.selectByIdRefeicaoRefeicaoAlimento(id_refeicao);

        if (result && result.length > 0) {
            message.DEFAULT_MESSAGE.status = message_config.SUCESS_RESPONSE.status;
            message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_RESPONSE.status_code;
            message.DEFAULT_MESSAGE.response = result;

            return message.DEFAULT_MESSAGE;
        } else {
            message.DEFAULT_MESSAGE.status = message_config.ERROR_NOT_FOUND.status;
            message.DEFAULT_MESSAGE.status_code = message_config.ERROR_NOT_FOUND.status_code;
            message.DEFAULT_MESSAGE.message = message_config.ERROR_NOT_FOUND.message;

            return message.DEFAULT_MESSAGE;
        }

    } catch (error) {
        console.log(error);
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}


// Função para atualizar uma Refeição Alimento existente
const atualizarRefeicaoAlimentacao = async function (refeicaoAlimentacao, contentType) {

    let message = JSON.parse(JSON.stringify(message_config));

    try {

        if (!String(contentType).includes('application/json')) {
            return message_config.ERROR_CONTENT_TYPE; // 415
        }

        if (
            refeicaoAlimentacao.id == undefined ||
            isNaN(refeicaoAlimentacao.id) ||
            Number(refeicaoAlimentacao.id) <= 0
        ) {
            let errorMessage = JSON.parse(JSON.stringify(message_config.ERROR_BAD_RESQUEST));
            errorMessage.field = 'id';
            return errorMessage;
        }

        let validar = validarRefeicaoAlimentacao(refeicaoAlimentacao);

        if (validar !== true) {
            return validar;
        }

        // Confirma se o registro existe antes de tentar atualizar
        let registroExistente = await refeicaoAlimentacaoDAO.selectByIdRefeicaoAlimento(refeicaoAlimentacao.id);

        if (!registroExistente || registroExistente.length == 0) {
            message.DEFAULT_MESSAGE.status = message_config.ERROR_NOT_FOUND.status;
            message.DEFAULT_MESSAGE.status_code = message_config.ERROR_NOT_FOUND.status_code;
            message.DEFAULT_MESSAGE.message = message_config.ERROR_NOT_FOUND.message;

            return message.DEFAULT_MESSAGE;
        }

        let result = await refeicaoAlimentacaoDAO.updateRefeicaoAlimento(refeicaoAlimentacao);

        if (result) {
            message.DEFAULT_MESSAGE.status = message_config.SUCESS_UPDATED_ITEM.status;
            message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_UPDATED_ITEM.status_code;
            message.DEFAULT_MESSAGE.message = message_config.SUCESS_UPDATED_ITEM.message;
            message.DEFAULT_MESSAGE.response = refeicaoAlimentacao;

            return message.DEFAULT_MESSAGE;
        } else {
            message.DEFAULT_MESSAGE.status = message_config.ERROR_BAD_RESQUEST.status;
            message.DEFAULT_MESSAGE.status_code = message_config.ERROR_BAD_RESQUEST.status_code;
            message.DEFAULT_MESSAGE.message = message_config.ERROR_BAD_RESQUEST.message;

            return message.DEFAULT_MESSAGE;
        }

    } catch (error) {
        console.log(error);
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}


// Função para excluir uma Refeição Alimento pelo ID
const excluirRefeicaoAlimentacao = async function (id) {

    let message = JSON.parse(JSON.stringify(message_config));

    try {

        if (id == undefined || isNaN(id) || Number(id) <= 0) {
            let errorMessage = JSON.parse(JSON.stringify(message_config.ERROR_BAD_RESQUEST));
            errorMessage.field = 'id';
            return errorMessage;
        }

        // Confirma se o registro existe antes de tentar excluir
        let registroExistente = await refeicaoAlimentacaoDAO.selectByIdRefeicaoAlimento(id);

        if (!registroExistente || registroExistente.length == 0) {
            message.DEFAULT_MESSAGE.status = message_config.ERROR_NOT_FOUND.status;
            message.DEFAULT_MESSAGE.status_code = message_config.ERROR_NOT_FOUND.status_code;
            message.DEFAULT_MESSAGE.message = message_config.ERROR_NOT_FOUND.message;

            return message.DEFAULT_MESSAGE;
        }

        let result = await refeicaoAlimentacaoDAO.deleteRefeicaoAlimento(id);

        if (result) {
            message.DEFAULT_MESSAGE.status = message_config.SUCESS_DELETED_ITEM.status;
            message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_DELETED_ITEM.status_code;
            message.DEFAULT_MESSAGE.message = message_config.SUCESS_DELETED_ITEM.message;

            return message.DEFAULT_MESSAGE;
        } else {
            message.DEFAULT_MESSAGE.status = message_config.ERROR_BAD_RESQUEST.status;
            message.DEFAULT_MESSAGE.status_code = message_config.ERROR_BAD_RESQUEST.status_code;
            message.DEFAULT_MESSAGE.message = message_config.ERROR_BAD_RESQUEST.message;

            return message.DEFAULT_MESSAGE;
        }

    } catch (error) {
        console.log(error);
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}

// Função para validar os dados recebidos de Refeição Alimentação
const validarRefeicaoAlimentacao = function (refeicaoAlimentacao) {

    let message = JSON.parse(JSON.stringify(message_config.ERROR_BAD_RESQUEST));

    if (
        refeicaoAlimentacao == undefined ||
        refeicaoAlimentacao.quantidade_g == undefined ||
        isNaN(refeicaoAlimentacao.quantidade_g) ||
        Number(refeicaoAlimentacao.quantidade_g) <= 0
    ) {
        message.field = 'quantidade_g';
        return message;
    }

    if (
        refeicaoAlimentacao.id_refeicao == undefined ||
        isNaN(refeicaoAlimentacao.id_refeicao) ||
        Number(refeicaoAlimentacao.id_refeicao) <= 0
    ) {
        message.field = 'id_refeicao';
        return message;
    }

    if (
        refeicaoAlimentacao.id_alimento == undefined ||
        isNaN(refeicaoAlimentacao.id_alimento) ||
        Number(refeicaoAlimentacao.id_alimento) <= 0
    ) {
        message.field = 'id_alimento';
        return message;
    }
    if (
        refeicaoAlimentacao.unidade_medida == undefined ||
        refeicaoAlimentacao.unidade_medida == null ||
        refeicaoAlimentacao.length >= 20
    ) {
        message.field = 'unidade_medida';
        return message;
    }


    return true;
}


module.exports = {
    inserirRefeicaoAlimentacao,
    selecionarTodosRefeicaoAlimentacao,
    selecionarPorIdRefeicaoAlimentacao,
    selecionarPorIdRefeicaoDaRefeicaoAlimentacao,
    atualizarRefeicaoAlimentacao,
    excluirRefeicaoAlimentacao,
    validarRefeicaoAlimentacao
}