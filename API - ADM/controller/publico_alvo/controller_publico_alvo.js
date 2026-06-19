/*********************************************************************************************************
 * Objetivo: Arquivo responsável pela leitura (Controller) da tabela de Público Alvo
 *      Dado estático, inserido manualmente no banco - somente listagem
 * Autor: Geovane
 * Versão: 1.0
 *********************************************************************************************************/

//Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMessages.js')

//Import do arquivo DAO para fazer a leitura de público alvo no banco de dados
const publicoAlvoDAO = require('../../model/DAO/publico_alvo/publico_alvo.js')


//Função para listar todos os Públicos Alvo cadastrados
const listarPublicoAlvo = async function () {

    let message = JSON.parse(JSON.stringify(message_config))

    try {

        let result = await publicoAlvoDAO.selectAllPublicoAlvo()

        if (result && result.length > 0) {
            message.DEFAULT_MESSAGE.status = message_config.SUCESS_RESPONSE.status
            message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_RESPONSE.status_code
            message.DEFAULT_MESSAGE.response = result

            return message.DEFAULT_MESSAGE //200
        } else {
            return message_config.ERROR_NOT_FOUND //404
        }

    } catch (error) {
        console.log(error)
        return message_config.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    listarPublicoAlvo
}
