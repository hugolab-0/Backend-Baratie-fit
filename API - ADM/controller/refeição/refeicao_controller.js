const message = require('../modulo/configMesssages.js');

const refeicaoDAO = require('../../model/DAO/refeição/refeicao.js');

const insertRefeicao = async function (refeicao, contentType) {
    let messageJson = JSON.parse(JSON.stringify(message));

    try {
        let validar = validarRefeicao(refeicao);

        // ERRO AQUI:
        // validarRefeicao() retorna TRUE quando os dados estão corretos.
        // Com o código abaixo você retorna TRUE e nunca executa o INSERT.
        //
        // if (validar) {
        //     return validar;
        // }

        // CORRETO:
        if (validar !== true) {
            return validar;
        }

        let result = await refeicaoDAO.insertRefeicao(refeicao);

        if (result) {
            refeicao.id = result; // Atribui o ID gerado no BD ao objeto refeicao
            messageJson.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status;
            messageJson.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code;
            messageJson.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message;
            messageJson.DEFAULT_MESSAGE.response = refeicao;

            return messageJson.DEFAULT_MESSAGE;
        } else {

            messageJson.DEFAULT_MESSAGE.status = message.ERROR_BAD_RESQUEST.status;
            messageJson.DEFAULT_MESSAGE.status_code = message.ERROR_BAD_RESQUEST.status_code;
            messageJson.DEFAULT_MESSAGE.message = message.ERROR_BAD_RESQUEST.message;

            return messageJson.DEFAULT_MESSAGE;
        }

    } catch (error) {
        console.log(error);
        return messageJson.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

const validarRefeicao = function (refeicao) {
    let messageJson = JSON.parse(JSON.stringify(message));

    if (refeicao.nome == '' || refeicao.nome == undefined || refeicao.nome.length > 100) {
        messageJson.message = 'O campo nome é obrigatório e deve conter no máximo 100 caracteres.';
        return messageJson;
    }

    if (refeicao.descricao == '' || refeicao.descricao == undefined || refeicao.descricao.length > 255) {
        messageJson.message = 'O campo descrição é obrigatório e deve conter no máximo 255 caracteres.';
        return messageJson;
    }

    if (refeicao.modo_preparo == '' || refeicao.modo_preparo == undefined || refeicao.modo_preparo.length > 255) {
        messageJson.message = 'O campo modo de preparo é obrigatório e deve conter no máximo 255 caracteres.';
        return messageJson;
    }

    if (refeicao.apoio_decisao == '' || refeicao.apoio_decisao == undefined || refeicao.apoio_decisao.length > 255) {
        messageJson.message = 'O campo apoio à decisão é obrigatório e deve conter no máximo 255 caracteres.';
        return messageJson;
    }

    if (refeicao.id_tipo_refeicao == '' || refeicao.id_tipo_refeicao == undefined) {
        messageJson.message = 'O campo id_tipo_refeicao é obrigatório.';
        return messageJson;
    }

    if (refeicao.id_publico_alvo == '' || refeicao.id_publico_alvo == undefined) {
        messageJson.message = 'O campo id_publico_alvo é obrigatório.';
        return messageJson;
    }

    if (refeicao.id_adm == '' || refeicao.id_adm == undefined) {
        messageJson.message = 'O campo id_adm é obrigatório.';
        return messageJson;
    }

    // Quando tudo estiver correto retorna TRUE
    return true;
};

module.exports = {
    insertRefeicao
};