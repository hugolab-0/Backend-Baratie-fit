/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pela leitura no Banco de dados MySQL na tabela
 * Restrição (dado estático, inserido manualmente no banco - somente listagem)
 * Autor: Geovane
 * Versão: 1.0
 * 
 *******************************************************************************************************/

//Import da biblioteca para gerenciar o banco de dados MySQL no node.js
const knex = require('knex')

//Import do arquivo de configuração para conexão com o banco de dados MySQL
const knexConfig = require('../../database_config_knex/knexFile.js')

//Criar a conexão com o banco de dados MySQL
const knexConex = knex(knexConfig.development)


//Função para retornar todos os dados da tabela de Restrição
const selectAllRestricao = async function () {

    try {

        //Script para retornar todas as restrições (ordenado por nome para facilitar a exibição em selects)
        let sql = `select * from tbl_restricao order by nome asc`

        //Executa no banco de dados o script SQL
        let result = await knexConex.raw(sql)

        //Validação para verificar se o retorno do Banco é um Array
        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    selectAllRestricao
}
