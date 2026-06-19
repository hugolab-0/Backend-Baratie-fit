/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de refeição.
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

/* INICIANDO CRUD DA TABELA DE REFEIÇÃO */

//retornar todos as refeições
const selectAllRefeicao = async function(){

    try {
        
        //criando variável sql
        let sql = `select * from tbl_refeicao order by id desc;`

        //enviando para o banco de dados
        let result = await knexConex.raw(sql)

        //Verificando se é um array
        if(Array.isArray(result)){

            return result[0]
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

//retorna uma refeição pelo id
const selectByIdRefeicao = async function(id){

    try {
        
        let sql = `select * from tbl_refeicao where id = ${id}`

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

//pesquisa uma refeição pelo nome
const selectByNameRefeicao = async function(nome){
    
    try {
        
        let sql = `select * from tbl_refeicao where tbl_refeicao.nome like '%${nome}%'`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}


//Exportando funções para serem utilizadas na controller
module.exports = {
    selectAllRefeicao,
    selectByIdRefeicao,
    selectByNameRefeicao
}