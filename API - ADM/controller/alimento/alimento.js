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
const alimentoDAO = require('../../model/DAO/alimento/alimento.js')


//Função para inserir um novo Alimento
const inserirAlimento = async function(alimento, contentType) {
    
    //Criando clone do objeto JSOn paea manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(message_config))

    try {
        
        if(String(contentType).includes('application/json')){

            let validar = await validarDados(alimento)

            if(validar){
                return validar
            }else{
                let result = await alimentoDAO.insertNewAlimento(alimento)

                if(result){ //201

                    refeicao.id = result
                    message.DEFAULT_MESSAGE.status = message.SUCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = alimento

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
const validarDados = async function(alimento) {
    let message = JSON.parse(JSON.stringify(message_config))

    try {
        if (
            alimento.nome === undefined        || alimento.nome === ''        || alimento.nome === null        ||
            alimento.descricao === undefined   || alimento.descricao === ''   || alimento.descricao === null   ||
            alimento.carboidratos_g === undefined || alimento.carboidratos_g === '' || alimento.carboidratos_g === null ||
            isNaN(Number(alimento.carboidratos_g)) || Number(alimento.carboidratos_g) < 0 ||
            alimento.proteinas_g === undefined || alimento.proteinas_g === '' || alimento.proteinas_g === null ||
            isNaN(Number(alimento.proteinas_g)) || Number(alimento.proteinas_g) < 0 ||
            alimento.lipidios_g === undefined || alimento.lipidios_g === '' || alimento.lipidios_g === null || 
            isNaN(Number(alimento.lipidios_g)) || Number(alimento.lipidios_g) < 0 ||
            alimento.fibras_g === undefined || alimento.fibras_g === '' || alimento.fibras_g === null || 
            isNaN(Number(alimento.fibras_g)) || Number(alimento.fibras_g) < 0 ||
            alimento.acucar_adicionado_g === undefined || alimento.acucar_adicionado_g === '' || alimento.acucar_adicionado_g === null || 
            isNaN(Number(alimento.acucar_adicionado_g)) || Number(alimento.acucar_adicionado_g) < 0 ||
            alimento.gorduras_trans_g === undefined || alimento.gorduras_trans_g === '' || alimento.gorduras_trans_g === null || 
            isNaN(Number(alimento.gorduras_trans_g)) || Number(alimento.gorduras_trans_g) < 0 ||
            alimento.gorduras_saturadas_g === undefined || alimento.gorduras_saturadas_g === '' || alimento.gorduras_saturadas_g === null || 
            isNaN(Number(alimento.gorduras_saturadas_g)) || Number(alimento.gorduras_saturadas_g) < 0)
            return message_config.ERROR_BAD_RESQUEST // 400

    } catch (error) {
        console.log(error)
        return message.DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}


module.exports = {
    inserirAlimento,
    validarDados
}