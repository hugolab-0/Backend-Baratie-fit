/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela 
 * Refeição Alimento
 * Data: 2026-06-16
 * Autor: Geovane
 * Versão: 1.1
 * 
 *******************************************************************************************************/


//Import da biblioteca para gerenciar o banco de dados MySQL no node.js
const knex = require('knex');

//Import do arquivo de configuração para conexão com o banco de dados MySQL
const knexConfig = require('../../database_config_knex/knexFile.js');

//Criar a conexão com o banco de dados MySQL
const knexConex = knex(knexConfig.development);

//Função para inserir dados na tabela refeição alimento
const insertRefeicaoAlimento = async function(refeicaoAlimento) {
    try {
        const sql = `insert into tbl_refeicao_alimento(
            quantidade_g,
            id_refeicao,
            id_alimento
        ) values (?, ?, ?);`;

        const result = await knexConex.raw(sql, [
            refeicaoAlimento.quantidade_g,
            refeicaoAlimento.id_refeicao,
            refeicaoAlimento.id_alimento
        ]);

        if (result)
            return result[0].insertId;
        else
            return false;

    } catch (error) {
        console.log(error);
        return false;
    }
}

// Função para retornar todos os dados da tabela de Refeição Alimento
const selectAllRefeicaoAlimento = async function() {
    try {
        let sql = `select * from tbl_refeicao_alimento order by id desc`;

        let result = await knexConex.raw(sql);

        if (Array.isArray(result))
            return result[0];
        else
            return false;

    } catch (error) {
        console.log(error);
        return false;
    }
}

// Função para retornar os dados de uma Refeição Alimento filtrando por ID
const selectByIdRefeicaoAlimento = async function(id) {
    try {
        let sql = `select * from tbl_refeicao_alimento where id = ?`;

        let result = await knexConex.raw(sql, [id]);

        if (Array.isArray(result))
            return result[0];
        else
            return false;

    } catch (error) {
        console.log(error);
        return false;
    }
}

// Função para retornar os dados de Refeição Alimento filtrando por id_refeicao
const selectByIdRefeicaoRefeicaoAlimento = async function(id_refeicao) {
    try {
        let sql = `select * from tbl_refeicao_alimento where id_refeicao = ?`;

        let result = await knexConex.raw(sql, [id_refeicao]);

        if (Array.isArray(result))
            return result[0];
        else
            return false;

    } catch (error) {
        console.log(error);
        return false;
    }
}

// Função para atualizar a quantidade (e/ou o alimento) de um registro de Refeição Alimento
const updateRefeicaoAlimento = async function(refeicaoAlimento) {
    try {
        let sql = `update tbl_refeicao_alimento
                    set quantidade_g = ?,
                        id_refeicao = ?,
                        id_alimento = ?
                    where id = ?`;

        let result = await knexConex.raw(sql, [
            refeicaoAlimento.quantidade_g,
            refeicaoAlimento.id_refeicao,
            refeicaoAlimento.id_alimento,
            refeicaoAlimento.id
        ]);

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        console.log(error);
        return false;
    }
}

// Função para excluir uma Refeição Alimento pelo ID
const deleteRefeicaoAlimento = async function(id) {
    try {
        let sql = `delete from tbl_refeicao_alimento where id = ?`;

        let result = await knexConex.raw(sql, [id]);

        if (result)
            return true;
        else
            return false;

    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    insertRefeicaoAlimento,
    selectAllRefeicaoAlimento,
    selectByIdRefeicaoAlimento,
    selectByIdRefeicaoRefeicaoAlimento,
    updateRefeicaoAlimento,
    deleteRefeicaoAlimento
}