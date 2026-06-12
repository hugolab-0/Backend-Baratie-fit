/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para o CRUD das restrições.
 * Data: 12/06/2026
 * Autor: Lucas Dias Brnadão Kolle
 * Versão: 1.0.06.26
 *******************************************************************************************************************************************************************************************/

//importando arquivo de mensagens
const config_message = require("../modulo/config_messages.js")

//importando arquivo de relacionado do DAO (MODEL)
const restricaoDAO = require("../../model/DAO/restricao/restricao.js")
const { json } = require("body-parser")

/* FUNÇÕES PARA O CRUD DAS RESTRIÇÕES */

//função para retornar todos as restrições cadastrados no banco de dados
const listarRestricao = async function(){

    //clonando a variável de mensagens para não modificar a original
    let message = JSON.parse(JSON.stringify(config_message))
    //JSON.stringify(config_message) -> transforma o Json em string
    //JSON.parse -> transforma de volta em Json

    try {

        //chama a função do DAO para retornar a lista de todos os filmes
        let result = await restricaoDAO.selectAllRestricao()

        //conferindo retorno do resulto para decidir qual mensagem mandar
        if(result){

            //verificando se o ARRAY está vazio (se for maior do que zero, ele envia o "200" se não, ele envia o "404")
            if(result.length > 0){

                //personalizando o cabeçalho com a mensagem de sucesso
                message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.restricao = result

                return message.DEFAULT_MESSAGE //retorna o cabeçalho com o "result" que contém os dados do filme

            //se estiver vazio ele retorna o "404"
            }else{
                return message.ERROR_NOT_FOUND //404
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
        }
        
    } catch (error) {
       return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

//função para buscar uma restrição
const buscarRestricaoId = async function(id){

    //clonando a variável de mensagens para não modificar a original
    let message = JSON.parse(JSON.stringify(config_message))
    //JSON.stringify(config_message) -> transforma o Json em string
    //JSON.parse -> transforma de volta em Json

    try {
        //tratando o id, para não mandar conteúdos errados pro banco
        if(id == undefined || id == "" || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = "ERRO! O ID enviado está incorreto."
            return message.ERROR_BAD_REQUEST //400
        
        //se o id estiver no formato correto ele ennvia pro DAO
        }else{
            let result = await restricaoDAO.selectByIdRestricao(id) //enviando o id pro DAO concluir o script

            //se o resultado estiver algo ele continua o programa
            if(result){

                //se o resultado for um ARRAY maior do que zero
                if(result.length > 0){

                    //editando cabeçalho
                    message.DEFAULT_MESSAGE.status = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.restricao = result

                    return message.DEFAULT_MESSAGE //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }

            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
            }

        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

/* EXPORTANDO FUNÇÕES */
module.exports = {
    listarRestricao,
    buscarRestricaoId
}