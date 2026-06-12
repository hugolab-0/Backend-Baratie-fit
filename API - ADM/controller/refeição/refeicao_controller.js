/*********************************************************************************************************
 * Objetivo: Arquivo responsavel pela validação , tratamento e
 *      manipulacao de dados para o CRUD de tipo de refeições
 * Data: 2026-06-12
 * Autor: Geovane
 * Versão: 1.0
 *********************************************************************************************************/

//Import do arquivo de padronização de mensagens
const message = require('../modulo/configMesssages.js');

//Import do arquivo DAO para fazer o CRUD de tipos de refeições no banco de dados
const refeicaoDAO = require('../../model/DAO/refeição/refeicao.js');

//Função para inserir uma nova Refeição
const inserirRefeicao = async function (refeicao, contentType) {
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

//Função para Atulizar um Alimento
const atualizarRefeicao = async function(refeicao, id, contentType) {

    //Criando clone do objeto JSOn para manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(message_config))
      
   try {
       //Validação do contente type para receber apenas Json
       //Consistente e funciona com charset
       if(String(contentType).includes('application/json')){
   
           //Validação para o ID correto
           let resultBuscarID = await buscar(id)
   
           if(resultBuscarID.status){
               let validar = await validarDados(refeicao)
   
               //Validação de campos obrigatórios para a atualização (Body)
               if(!validar){
                   //Adiciono o atributo ID da refeição no Json para ser enviado ao DAO
                   refeicao.id = id
   
   
                   let result = await refeicaoDAO.updateRefeicao(refeicao)
   
                   if(result){
                       message.DEFAULT_MESSAGE.status = message.SUCESS_UPDATED_ITEM.status
                       message.DEFAULT_MESSAGE.status_code = message_config.SUCESS_UPDATED_ITEM.status_code
                       message.DEFAULT_MESSAGE.message = message.SUCESS_UPDATED_ITEM.message
                       message.DEFAULT_MESSAGE.response = refeicao
   
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

//Função para listar todos as Refeições criadas
const listarRefeicoes = async function() {
 
    let message = JSON.parse(JSON.stringify(message_config))

    try {

        let result = await refeicaoDAO.selectAllRefeicao()

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

//Função para buscar Refeição via ID
const buscarRefeicao = async function(id) {
    
    let message = JSON.parse(JSON.stringify(message_config))
    
    try {
    
        if(id === undefined || id === null || id === '' || isNaN(id)){
            message.ERROR_BAD_RESQUEST.field = '[ID] Inválido'

            return message.ERROR_BAD_RESQUEST //400

        }else{
            let result = await refeicaoDAO.selectByIdRefeicao(id)
    
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

//Função para excluir uma Refeição registrada
const excluirRefeicao = async function(id) {
    let message = JSON.parse(JSON.stringify(message_config))
       
           try {
               //Validação do erro 400 e 404
               let resultBuscarID = await buscarRefeicao(id)
       
               //Validação para verificar se o status é verdadeiro (se existe o alimento)
               if(resultBuscarID.status){
                   //Chamar função do DAO para excluir o alimento
                   let result = await refeicaoDAO.deleteRefeicao(id)
       
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

//Função para validar os dados
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
    inserirRefeicao,
    atualizarRefeicao,
    listarRefeicoes,
    buscarRefeicao,
    excluirRefeicao,
    validarRefeicao
};