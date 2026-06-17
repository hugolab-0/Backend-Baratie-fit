//Impor da biblioteca para gereniciar o banco de dados MySQL no node.js
const knex = require('knex');

//Import do arquivo de configiração para conexão com o banco de dados MySQL
const knexConfig = require('../../database_config_knex/knexFile.js');

//Criar a conexão com o banco de dados MySQL
const knexConex = knex(knexConfig.development);

const insertRefeicaoRestricao = async function(refeicaoRestricao) {
    try {
        const sql = `insert into tbl_refeicao_restricao(
            id_refeicao,
            id_restricao
        ) values (
            ${refeicaoRestricao.id_refeicao},
            ${refeicaoRestricao.id_restricao}
        );`;

        const result = await knexConex.raw(sql);

        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        console.log(error);
        return false
    }
}

// Função para excluir uma Refeição Restrição pelo ID
const deleteRefeicaoRestricao = async function(id_refeicao, id_restricao) {
    try {
        let sql = `delete from tbl_refeicao_restricao 
                   where id_refeicao = ${id_refeicao} 
                   and id_restricao = ${id_restricao}`;

        let result = await knexConex.raw(sql);

        if(result)
            return true
        else
            return false

    } catch (error) {
        console.log(error);
        return false
    }
}

// Função para retornar todos os dados da tabela de Refeição Restrição
const selectAllRefeicaoRestricao = async function() {
    try {
        let sql = `select * from tbl_refeicao_restricao order by id desc`;

        let result = await knexConex.raw(sql);

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        console.log(error);
        return false
    }
}

// Função para retornar os dados de uma Refeição Restrição filtrando por ID
const selectByIdRefeicao = async function(id) {
    
    try {
        
        let sql = `select * from tbl_refeicao_restricao where id_refeicao = ${id}`

        let result = await knexConex.raw(sql)

        if (Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        console.log(error);
        return false
    }
}

const selectByIdAlimento = async function(id) {
    
    try {
        
        let sql = `select * from tbl_refeicao_restricao where id_restricao = ${id}`

        let result = await knexConex.raw(sql)

        if (Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    insertRefeicaoRestricao,
    deleteRefeicaoRestricao,
    selectAllRefeicaoRestricao,
    selectByIdRefeicao,
    selectByIdAlimento
}