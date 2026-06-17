/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de intermediário de refeição e restrição.
 * Data: 17/06/2026
 * Autor: Lucas Dias Brandão Kolle
 * Versão: 1.0.06.26
 ********************************************************************************************************************************************************************************************/

//importando a biblioteca para gerenciar o banco de dados no node.js
const knex = require("knex")

//importando o arquivo "database_config_knex" para atribuir as configurações do BD
const knexConfig = require("../../database_config_knex/knexFile.js")

//criando a conexão por meio do arquivo que contém os dados necessários para estabelecer o acesso e a conexão
const knexConex = knex(knexConfig.development) //aciona o knex e passa as configurações estabelecidas no arquivo

/* INICIANDO CRUD DA TABELA INTEMDIÁRIA DE REFEIÇÃO E RESTRIÇÃO */

//retornar todos os dados
const selectAllRefeicaoRestricao = async function(){

    try {
        
        //criando variável sql
        let sql = `select * from tbl_refeicao_restricao order by id desc;`

        //enviando para o banco de dados
        let result = await knexConex.raw(sql)

        //Verificando se é um array
        if(Array.isArray(result)){

            return result[0]
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//retorna um dado específico
const selectByIdRefeicaoRestricao = async function(id){

    try {
        
        let sql = `select * from tbl_refeicao_restricao where id = ${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}


//Exportando funções para serem utilizadas na controller
module.exports = {
    selectAllRefeicaoRestricao,
    selectByIdRefeicaoRestricao
}