// Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMessages.js');
// Import do arquivo DAO para fazer o CRUD de refeição restrição no banco de dados
const refeicaoRestricaoDAO = require('../../model/DAO/refeicao_restricao/refeicao_restricao.js');
// Import da controller de refeição para validar se a refeição existe

// Função para inserir uma nova Refeição Restrição
const inserirRefeicaoRestricao = async function (refeicaoRestricao, contentType) {

    let message = JSON.parse(JSON.stringify(message_config));

    try {

        if (!String(contentType).includes('application/json')) {
            return message_config.ERROR_CONTENT_TYPE;
        }

        let validar = validarRefeicaoRestricao(refeicaoRestricao);

        console.log(validar, 'resultado da validação');

        if (validar !== true) {
            return validar;
        }

        let result = await refeicaoRestricaoDAO.insertRefeicaoRestricao(refeicaoRestricao);

        console.log(result, 'resultado do insert');

        if (result) {

            refeicaoRestricao.id = result;

            message.DEFAULT_MESSAGE.status =
                message_config.SUCESS_CREATED_ITEM.status;

            message.DEFAULT_MESSAGE.status_code =
                message_config.SUCESS_CREATED_ITEM.status_code;

            message.DEFAULT_MESSAGE.message =
                message_config.SUCESS_CREATED_ITEM.message;

            message.DEFAULT_MESSAGE.response =
                refeicaoRestricao;

            return message.DEFAULT_MESSAGE;

        } else {

            message.DEFAULT_MESSAGE.status =
                message_config.ERROR_BAD_RESQUEST.status;

            message.DEFAULT_MESSAGE.status_code =
                message_config.ERROR_BAD_RESQUEST.status_code;

            message.DEFAULT_MESSAGE.message =
                message_config.ERROR_BAD_RESQUEST.message;

            return message.DEFAULT_MESSAGE;
        }

    } catch (error) {

        console.log(error);

        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};
// Função para excluir uma Refeição Restrição pelo ID
const excluirRefeicaoRestricao = async function (id_refeicao, id_restricao) {

    let message = JSON.parse(JSON.stringify(message_config));

    try {

        let validar = validarIds(id_refeicao, id_restricao);

        if (validar !== true) {
            return validar; // 400
        }

        let resultBuscar = await buscarRefeicaoRestricaoPorRefeicao(id_refeicao);

        if (resultBuscar.status) {
            let result = await refeicaoRestricaoDAO.deleteRefeicaoRestricao(id_refeicao, id_restricao);

            if (result) {
                return message_config.SUCESS_DELETED_ITEM; // 200
            } else {
                return message_config.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
        } else {
            return resultBuscar; // 400 ou 404
        }

    } catch (error) {
        console.log(error);
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Função para listar todos os vínculos de Refeição Restrição
const listarRefeicaoRestricao = async function () {

    let message = JSON.parse(JSON.stringify(message_config));

    try {
        let result = await refeicaoRestricaoDAO.selectAllRefeicaoRestricao();

        if (result) {
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message_config.SUCESS_RESPONSE.status;
                message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_RESPONSE.status_code;
                message.DEFAULT_MESSAGE.response = {
                    count: result.length,
                    refeicao_restricao: result
                };

                return message.DEFAULT_MESSAGE; // 200
            } else {
                return message_config.ERROR_NOT_FOUND; // 404
            }
        } else {
            return message_config.ERROR_INTERNAL_SERVER_MODEL; // 500
        }

    } catch (error) {
        console.log(error);
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Função para buscar vínculos de Refeição Restrição pelo ID da Refeição
const buscarRefeicaoRestricaoPorRefeicao = async function (id_refeicao) {

    let message = JSON.parse(JSON.stringify(message_config));

    try {
        if (id_refeicao === undefined || id_refeicao === null || id_refeicao === '' || isNaN(id_refeicao)) {
            message.ERROR_BAD_RESQUEST.field = '[id_refeicao] Inválido';
            return message.ERROR_BAD_RESQUEST; // 400
        }

        let result = await refeicaoRestricaoDAO.selectByIdRefeicao(id_refeicao);

        if (result) {
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message_config.SUCESS_RESPONSE.status;
                message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_RESPONSE.status_code;
                message.DEFAULT_MESSAGE.response = result;

                return message.DEFAULT_MESSAGE; // 200
            } else {
                return message_config.ERROR_NOT_FOUND; // 404
            }
        } else {
            return message_config.ERROR_INTERNAL_SERVER_MODEL; // 500
        }

    } catch (error) {
        console.log(error);
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Função para buscar vínculos de Refeição Restrição pelo ID da Restrição
const buscarRefeicaoRestricaoPorRestricao = async function (id_restricao) {

    let message = JSON.parse(JSON.stringify(message_config));

    try {
        if (id_restricao === undefined || id_restricao === null || id_restricao === '' || isNaN(id_restricao)) {
            message.ERROR_BAD_RESQUEST.field = '[id_restricao] Inválido';
            return message.ERROR_BAD_RESQUEST; // 400
        }

        let result = await refeicaoRestricaoDAO.selectByIdAlimento(id_restricao);

        if (result) {
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message_config.SUCESS_RESPONSE.status;
                message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_RESPONSE.status_code;
                message.DEFAULT_MESSAGE.response = result;

                return message.DEFAULT_MESSAGE; // 200
            } else {
                return message_config.ERROR_NOT_FOUND; // 404
            }
        } else {
            return message_config.ERROR_INTERNAL_SERVER_MODEL; // 500
        }

    } catch (error) {
        console.log(error);
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Função para validar os IDs recebidos
const validarIds = function (id_refeicao, id_restricao) {

    let message = JSON.parse(JSON.stringify(message_config));

    if (id_refeicao === undefined || id_refeicao === null || id_refeicao === '' || isNaN(id_refeicao)) {
        message.ERROR_BAD_RESQUEST.field = '[id_refeicao] Inválido';
        return message.ERROR_BAD_RESQUEST; // 400
    }

    if (id_restricao === undefined || id_restricao === null || id_restricao === '' || isNaN(id_restricao)) {
        message.ERROR_BAD_RESQUEST.field = '[id_restricao] Inválido';
        return message.ERROR_BAD_RESQUEST; // 400
    }

    return true;
};

// Função para validar os dados do body
const validarRefeicaoRestricao = function (refeicaoRestricao) {

    let message = JSON.parse(JSON.stringify(message_config));

    if (refeicaoRestricao.id_refeicao == '' || refeicaoRestricao.id_refeicao == undefined || isNaN(refeicaoRestricao.id_refeicao)) {
        message.ERROR_BAD_RESQUEST.message = 'O campo id_refeicao é obrigatório e deve ser um número válido.';
        return message.ERROR_BAD_RESQUEST; // 400
    }

    if (refeicaoRestricao.id_restricao == '' || refeicaoRestricao.id_restricao == undefined || isNaN(refeicaoRestricao.id_restricao)) {
        message.ERROR_BAD_RESQUEST.message = 'O campo id_restricao é obrigatório e deve ser um número válido.';
        return message.ERROR_BAD_RESQUEST; // 400
    }

    return true;
};

module.exports = {
    inserirRefeicaoRestricao,
    excluirRefeicaoRestricao,
    listarRefeicaoRestricao,
    buscarRefeicaoRestricaoPorRefeicao,
    buscarRefeicaoRestricaoPorRestricao,
    validarRefeicaoRestricao
};