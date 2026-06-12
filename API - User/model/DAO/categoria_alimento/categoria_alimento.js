/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de categoria de alimentos.
 * Data: 12/06/2026
 * Autor: Lucas Dias Brandão Kolle
 * Versão: 1.0.06.26
 ********************************************************************************************************************************************************************************************/

//importando a biblioteca para gerenciar o banco de dados no node.js
const knex = require("knex")

//importando o arquivo "database_config_knex" para atribuir as configurações do BD
const knexConfig = require("../../database_config_knex/knexFile.js")

//criando a conexão por meio do arquivo que contém os dados necessários para estabelecer o acesso e a conexão
const knexConex = knex(knexConfig.development) //aciona o knex e passa as configurações estabelecidas no arquivo

/* INICIANDO CRUD DA TABELA DE CATEGORIA DE ALIMENTOS */

//retornar todos as categorias de alimentos
const selectAllCategoriaAlimento = async function(){

    try {
        
        //criando variável sql
        let sql = `select * from tbl_categoria_alimento order by id desc;`

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

//retorna as categorias dos alimentos
const selectByIdCategoriaAlimento = async function(id){

    try {
        
        let sql = `select * from tbl_categoria_alimento where id = ${id}`

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
    selectAllCategoriaAlimento,
    selectByIdCategoriaAlimento
}