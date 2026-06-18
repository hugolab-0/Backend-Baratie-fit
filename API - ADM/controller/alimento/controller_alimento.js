/*********************************************************************************************************
 * Objetivo: Arquivo responsavel pela validação , tratamento e
 *      manipulacao de dados para o CRUD de tipo de refeições
 * Data: 2026-06-11
 * Autor: Geovane
 * Versão: 1.0
 *********************************************************************************************************/

//Import do arquivo de padronização de mensagens
const message_config = require('../modulo/configMessages.js')

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

                    alimento.id = result
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

//Função para Atulizar um Alimento
const atualizarAlimento = async function(alimento, id, contentType) {

    //Criando clone do objeto JSOn paea manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(message_config))
      
   try {
       //Validação do contente type para receber apenas Json
       //Consistente e funciona com charset
       if(String(contentType).includes('application/json')){
   
           //Validação para o ID correto
           let resultBuscarID = await buscarAlimento(id)
   
           if(resultBuscarID.status){
               let validar = await validarDados(alimento)
   
               //Validação de campos obrigatórios para a atualização (Body)
               if(!validar){
                   //Adiciono o atributo ID do filme no Json para ser enviado ao DAO
                   alimento.id = id
   
   
                   let result = await alimentoDAO.updateAlimento(alimento)
   
                   if(result){
                       message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                       message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_UPDATED_ITEM.status_code
                       message.DEFAULT_MESSAGE.message = message.SUCESS_UPDATED_ITEM.message
                       message.DEFAULT_MESSAGE.response = alimento
   
                       return message.DEFAULT_MESSAGE //200 (Atualizado)
                   }else{
                       return message.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
                   }
   
               }else{
                   return validar //400
               }
           }else{
               return resultBuscarID //400 ou 404 ou 500
           }
       }else{
           return message.ERROR_CONTENT_TYPE //415
       }
   } catch (error) {
       console.log(error)
       return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
   }
}

//Função para listar todos os alimentos criados
const listarAlimento = async function() {
 
    let message = JSON.parse(JSON.stringify(message_config))

    try {

        let result = await alimentoDAO.selectAllAlimento()

        if (result) {
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.alimento = result
                
                return message.DEFAULT_MESSAGE //200

            }else{
                return message.ERROR_NOT_FOUND //404
            }

        }else {
            return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
        }
        
    } catch (error) {
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
        
    }
}

//Função para buscar alimentos via ID
const buscarAlimento = async function(id) {
    
    let message = JSON.parse(JSON.stringify(message_config))
    
    try {
    
        if(id === undefined || id === null || id === '' || isNaN(id)){
            message.ERROR_BAD_RESQUEST.field = '[ID] Inválido'

            return message.ERROR_BAD_RESQUEST //400

        }else{
            let result = await alimentoDAO.selectByIdAlimento(id)
    
            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response = result
    
                    return message.DEFAULT_MESSAGE //200
    
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (Model)
            }
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para excluir um alimento registrado
const excluirAlimento = async function(id) {
    let message = JSON.parse(JSON.stringify(message_config))
       
           try {
               //Validação do erro 400 e 404
               let resultBuscarID = await buscarAlimento(id)
       
               //Validação para verificar se o status é verdadeiro (se existe o alimento)
               if(resultBuscarID.status){
                   //Chamar função do DAO para excluir o alimento
                   let result = await alimentoDAO.deleteAlimento(id)
       
                   if(result){
                       return message.SUCESS_DELETED_ITEM //200 (Registro exluído)
                   }else {
                       return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
                   }
               }else {
                   return resultBuscarID //400 ou 404
               }
       
       
           } catch (error) {
               return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
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
            isNaN(Number(alimento.gorduras_saturadas_g)) || Number(alimento.gorduras_saturadas_g) < 0 ||
            alimento.id_categoria == undefined || alimento.id_categoria == '' || alimento.id_categoria == null ||
            alimento.id_categoria == undefined || alimento.id_categoria == '' || alimento.id_categoria == null || isNaN(Number(alimento.id_categoria)) ||
            alimento.id_adm == undefined || alimento.id_adm == '' || alimento.id_adm == null || isNaN(Number(alimento.id_adm)) ||
            alimento.id_enquadramento == undefined || alimento.id_enquadramento == '' || alimento.id_enquadramento == null ||
            isNaN(Number(alimento.id_enquadramento)))
            return message_config.ERROR_BAD_RESQUEST // 400

            return false

    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}


module.exports = {
    inserirAlimento,
    atualizarAlimento,
    listarAlimento,
    buscarAlimento,
    excluirAlimento,
    validarDados
}