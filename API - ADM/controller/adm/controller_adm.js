/*********************************************************************************************************
 * Objetivo: Arquivo responsavel pela validação , tratamento e
 *      manipulacao de dados para o CRUD da tabela de ADM
 * Data: 2026-06-15
 * Autor: Geovane
 * Versão: 1.0
 *********************************************************************************************************/
 
//Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMessages.js');
 
//Import do arquivo DAO para fazer o CRUD de tipos de refeições no banco de dados
const admDAO = require('../../model/DAO/adm/adm.js');
 
//Função para inserir um novo perfil de ADM
const inserirADM = async function (adm, contentType) {

    let message = JSON.parse(JSON.stringify(message_config));
 
    try {
        
        if (!String(contentType).includes('application/json')) {
            return message_config.ERROR_CONTENT_TYPE; // 415
        }

        let validar = validarADM(adm);
 
        if (validar !== true) {
            return validar;
        }
 
        let result = await admDAO.insertADM(adm);
 
        if (result) {
            adm.id = result;
            message.DEFAULT_MESSAGE.status = message_config.SUCESS_CREATED_ITEM.status;
            message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_CREATED_ITEM.status_code;
            message.DEFAULT_MESSAGE.message = message_config.SUCESS_CREATED_ITEM.message;
            message.DEFAULT_MESSAGE.response = adm;
 
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
 
//Função para Atualizar um perfil de ADM
const atualizarADM = async function (adm, id, contentType) {
 
    let message = JSON.parse(JSON.stringify(message_config));
 
    try {
        if (String(contentType).includes('application/json')) {
 
            let resultBuscarID = await buscarADM(id);
 
            if (resultBuscarID.status) {
                let validar = validarADM(adm);
 
                if (validar !== true) {
                    return validar; // 400
                }
 
                adm.id = id;
 
                let result = await admDAO.updateADM(adm);
 
                if (result) {
                    message.DEFAULT_MESSAGE.status = message_config.SUCESS_UPDATED_ITEM.status;
                    message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_UPDATED_ITEM.status_code;
                    message.DEFAULT_MESSAGE.message = message_config.SUCESS_UPDATED_ITEM.message;
                    message.DEFAULT_MESSAGE.response = adm;
 
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
 
//Função para listar todos os ADM criadas
const listarADM = async function () {
 
    let message = JSON.parse(JSON.stringify(message_config));
 
    try {
        let result = await admDAO.selectAllADM();
 
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
 
//Função para buscar ADM via ID
const buscarADM = async function (id) {
 
    let message = JSON.parse(JSON.stringify(message_config));
 
    try {
        if (id === undefined || id === null || id === '' || isNaN(id)) {
            message.ERROR_BAD_RESQUEST.field = '[ID] Inválido';
            return message.ERROR_BAD_RESQUEST; // 400
        } else {
            let result = await admDAO.selectByIdADM(id);
 
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
 
//Função para excluir um ADM registrada
const excluirADM = async function (id) {
 
    let message = JSON.parse(JSON.stringify(message_config));
 
    try {
        let resultBuscarID = await buscarADM(id);
 
        if (resultBuscarID.status) {
            let result = await admDAO.deleteADM(id);
 
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
const validarADM = function (adm) {

    let message = JSON.parse(JSON.stringify(message_config));

    if (adm.nome == '' || adm.nome == undefined || adm.nome.length > 100) {
        message.ERROR_BAD_RESQUEST.message = 'O campo nome é obrigatório e deve conter no máximo 100 caracteres.';
        return message.ERROR_BAD_RESQUEST;
    }

    if (adm.email == '' || adm.email == undefined || adm.email.length > 255) {
        message.ERROR_BAD_RESQUEST.message = 'O campo email é obrigatório e deve conter no máximo 255 caracteres.';
        return message.ERROR_BAD_RESQUEST;
    }

    if (adm.senha == '' || adm.senha == undefined || adm.senha.length > 512) {
        message.ERROR_BAD_RESQUEST.message = 'O campo senha é obrigatório e deve conter no máximo 512 caracteres.';
        return message.ERROR_BAD_RESQUEST;
    }


    if (adm.id_nivel_acesso == '' || adm.id_nivel_acesso == undefined || isNaN(adm.id_nivel_acesso)) {
        message.ERROR_BAD_RESQUEST.message = 'O campo nível de acesso é obrigatório e deve ser um número válido.';
        return message.ERROR_BAD_RESQUEST;
    }

    return true;
};
 
module.exports = {
  inserirADM,
  atualizarADM,
  listarADM,
  buscarADM,
  excluirADM,
  validarADM
};
 
