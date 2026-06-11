/*********************************************************************************************************
 * Objetivo: Arquivo responsavel pela validação , tratamento e
 *      manipulacao de dados para o CRUD de tipo de refeições
 * Data: 2026-06-11
 * Autor: Geovane
 * Versão: 1.0
 *********************************************************************************************************/

//Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMesssages.js')

//Import do arquivo DAO para fazer o CRUD de tipos de refeições no banco de dados
const tipoRefeicaoDAO = require('../../model/DAO/alimento/alimento.js.js')


//Função para inserir um novo tipo de Refeição
const inserirRefeicao = async function(refeicao, contentType) {
    
    //Criando clone do objeto JSOn paea manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(message_config))

    try {
        
        if(String(contentType).includes('application/json')){

            let validar = await validarDados(refeicao)

            if(validar){
                return validar
            }else{
                let result = await tipoRefeicaoDAO.insertNewTipoRefeicao(refeicao)

                if(result){ //201

                    refeicao.id = result
                    message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = refeicao

                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500 (ERRO na model)
                }

                return message.DEFAULT_MESSAGE
            }

        }else{
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error);        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}


//Função para validar Dados
const validarDados = async function(refeicao) {
    
    //Criando clone do objeto JSOn paea manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(message_config))

    try {
        
        if(refeicao.nome === undefined || refeicao.nome === '' || refeicao.nome === null)
            return message_config.ERROR_BAD_RESQUEST //400
    } catch (error) {
        console.log(error);
        return message.DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500 (ERRO na controller)
    }
}


module.exports = {
    inserirRefeicao,
    validarDados
}