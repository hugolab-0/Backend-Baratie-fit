//Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMessages.js');
 
//Import do arquivo DAO para fazer o CRUD de tipos de refeições no banco de dados
const refeicaoAlimentacaoDAO = require('../../model/DAO/refeicao_alimentacao/refeicao_alimentacao.js');


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

        let result = await refeicaoAlimentacaoDAO.insertRefeicaoAlimentacao(refeicaoAlimentacao);

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