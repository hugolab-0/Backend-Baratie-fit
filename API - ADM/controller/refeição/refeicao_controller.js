/*********************************************************************************************************
 * Objetivo: Arquivo responsavel pela validação , tratamento e
 *      manipulacao de dados para o CRUD de tipo de refeições
 * Data: 2026-06-12
 * Autor: Geovane
 * Versão: 1.1
 *********************************************************************************************************/
 
//Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMessages.js');

//Import da controller que faz o upload da foto
const UPLOAD = require('../upload/controller_upload_azure.js')

//Import do arquivo DAO para fazer o CRUD de tipos de refeições no banco de dados
const refeicaoDAO = require('../../model/DAO/refeição/refeicao.js');
 
//Import do arquivo DAO para fazer o CRUD de tipos de refeições no banco de dados
//Função para inserir uma nova Refeição
const inserirRefeicao = async function (refeicao, contentType, foto) {

    let message = JSON.parse(JSON.stringify(message_config));

    try {

        if (!String(contentType).includes('application/json') && !String(contentType).includes('multipart/form-data')) {
            return message_config.ERROR_CONTENT_TYPE; // 415
        }

        //Envia a foto para ser feito o upload do arquivo
        let urlFoto = await UPLOAD.uploadfiles(foto)

        if (urlFoto) {
            //Adiciona a url do arquivo após o upload
            refeicao.img = urlFoto
        } else {
            return message_config.ERRO_UPLOAD_FILE
        }

        let validar = validarRefeicao(refeicao);

        if (validar !== true) {
            return validar;
        }

        let result = await refeicaoDAO.insertRefeicao(refeicao);

        if (result) {
            refeicao.id = result;
            message.DEFAULT_MESSAGE.status = message_config.SUCESS_CREATED_ITEM.status;
            message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_CREATED_ITEM.status_code;
            message.DEFAULT_MESSAGE.message = message_config.SUCESS_CREATED_ITEM.message;
            message.DEFAULT_MESSAGE.response = refeicao;

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
};
 
//Função para Atualizar uma Refeição
const atualizarRefeicao = async function (refeicao, id, contentType) {
 
    let message = JSON.parse(JSON.stringify(message_config));
 
    try {
        if (String(contentType).includes('application/json') || String(contentType).includes('multipart/form-data')) {
 
            let resultBuscarID = await buscarRefeicao(id);
 
            if (resultBuscarID.status) {
                let validar = validarRefeicao(refeicao, true)
 
                if (validar !== true) {
                    return validar; // 400
                }
 
                refeicao.id = id;
 
                let result = await refeicaoDAO.updateRefeicao(refeicao);
 
                if (result) {
                    message.DEFAULT_MESSAGE.status = message_config.SUCESS_UPDATED_ITEM.status;
                    // FIX: era "message_config.SUCESS_UPDATED_ITEM.status_code" misturado — padronizado
                    message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_UPDATED_ITEM.status_code;
                    message.DEFAULT_MESSAGE.message = message_config.SUCESS_UPDATED_ITEM.message;
                    message.DEFAULT_MESSAGE.response = refeicao;
 
                    return message.DEFAULT_MESSAGE; // 200
                } else {
                    return message_config.ERROR_INTERNAL_SERVER_MODEL; // 500 (Model)
                }
 
            } else {
                return resultBuscarID; // 400 ou 404 ou 500
            }
        } else {
            return message_config.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.log(error);
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};
 
//Função para listar todos as Refeições criadas
const listarRefeicoes = async function () {
 
    let message = JSON.parse(JSON.stringify(message_config));
 
    try {
        let result = await refeicaoDAO.selectAllRefeicao();
 
        if (result) {
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message_config.SUCESS_RESPONSE.status;
                message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_RESPONSE.status_code;
                message.DEFAULT_MESSAGE.response = {
                    count: result.length,
                    refeicao: result
                };
 
                return message.DEFAULT_MESSAGE; // 200
            } else {
                return message_config.ERROR_NOT_FOUND; // 404
            }
        } else {
            return message_config.ERROR_INTERNAL_SERVER_MODEL; // 500 (model)
        }
 
    } catch (error) {
        console.log(error);
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};
 
//Função para buscar Refeição via ID
const buscarRefeicao = async function (id) {
 
    let message = JSON.parse(JSON.stringify(message_config));
 
    try {
        if (id == undefined || id == null || id == '' || isNaN(id)) {
            message.DEFAULT_MESSAGE.status = message_config.ERROR_BAD_RESQUEST.status
            message.DEFAULT_MESSAGE.status_code = message_config.ERROR_BAD_RESQUEST.status_code
            message.DEFAULT_MESSAGE.message = '[ID] Inválido'
        
            return message.DEFAULT_MESSAGE
        } else {
            let result = await refeicaoDAO.selectByIdRefeicao(id);
 
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
                return message_config.ERROR_INTERNAL_SERVER_MODEL; // 500 (Model)
            }
        }
    } catch (error) {
        console.log(error);
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};
 
//Função para excluir uma Refeição registrada
const excluirRefeicao = async function (id) {
 
    let message = JSON.parse(JSON.stringify(message_config));
 
    try {
        let resultBuscarID = await buscarRefeicao(id);
 
        if (resultBuscarID.status) {
            let result = await refeicaoDAO.deleteRefeicao(id);
 
            if (result) {
                return message_config.SUCESS_DELETED_ITEM; // 200
            } else {
                return message_config.ERROR_INTERNAL_SERVER_MODEL; // 500 (model)
            }
        } else {
            return resultBuscarID; // 400 ou 404
        }
 
    } catch (error) {
        console.log(error);
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};
 
//Função para validar os dados
const validarRefeicao = function (refeicao, isUpdate = false) {

    let message = JSON.parse(JSON.stringify(message_config));

    if (
        refeicao.nome == '' ||
        refeicao.nome == undefined ||
        refeicao.nome.length > 100
    ) {
        message.ERROR_BAD_RESQUEST.message =
            'O campo nome é obrigatório e deve conter no máximo 100 caracteres.';
        return message.ERROR_BAD_RESQUEST;
    }

    if (
        refeicao.descricao == '' ||
        refeicao.descricao == undefined ||
        refeicao.descricao.length > 255
    ) {
        message.ERROR_BAD_RESQUEST.message =
            'O campo descrição é obrigatório e deve conter no máximo 255 caracteres.';
        return message.ERROR_BAD_RESQUEST;
    }

    if (
        refeicao.modo_preparo == '' ||
        refeicao.modo_preparo == undefined ||
        refeicao.modo_preparo.length > 255
    ) {
        message.ERROR_BAD_RESQUEST.message =
            'O campo modo de preparo é obrigatório e deve conter no máximo 255 caracteres.';
        return message.ERROR_BAD_RESQUEST;
    }

    if (
        refeicao.apoio_decisao == '' ||
        refeicao.apoio_decisao == undefined ||
        refeicao.apoio_decisao.length > 255
    ) {
        message.ERROR_BAD_RESQUEST.message =
            'O campo apoio à decisão é obrigatório e deve conter no máximo 255 caracteres.';
        return message.ERROR_BAD_RESQUEST;
    }

    // A imagem é obrigatória apenas no cadastro
    if (!isUpdate) {
        if (refeicao.img == '' || refeicao.img == undefined) {
            message.ERROR_BAD_RESQUEST.message =
                'O campo img é obrigatório.';
            return message.ERROR_BAD_RESQUEST;
        }
    }

    if (
        refeicao.id_tipo_refeicao == '' ||
        refeicao.id_tipo_refeicao == undefined ||
        isNaN(refeicao.id_tipo_refeicao)
    ) {
        message.ERROR_BAD_RESQUEST.message =
            'O campo id_tipo_refeicao é obrigatório e deve ser numérico.';
        return message.ERROR_BAD_RESQUEST;
    }

    if (
        refeicao.id_publico_alvo == '' ||
        refeicao.id_publico_alvo == undefined ||
        isNaN(refeicao.id_publico_alvo)
    ) {
        message.ERROR_BAD_RESQUEST.message =
            'O campo id_publico_alvo é obrigatório e deve ser numérico.';
        return message.ERROR_BAD_RESQUEST;
    }

    if (
        refeicao.id_adm == '' ||
        refeicao.id_adm == undefined ||
        isNaN(refeicao.id_adm)
    ) {
        message.ERROR_BAD_RESQUEST.message =
            'O campo id_adm é obrigatório e deve ser numérico.';
        return message.ERROR_BAD_RESQUEST;
    }

    return true;
};


 
module.exports = {
    inserirRefeicao,
    atualizarRefeicao,
    listarRefeicoes,
    buscarRefeicao,
    excluirRefeicao,
    validarRefeicao
};
 
