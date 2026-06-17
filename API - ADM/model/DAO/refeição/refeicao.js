/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela 
 * Refeição
 * Data: 12/06/2026
 * Autor: Geovane
 * Versão: 1.0
 * 
 *******************************************************************************************************/

//Impor da biblioteca para gereniciar o banco de dados MySQL no node.js
const knex = require('knex');

//Import do arquivo de configiração para conexão com o banco de dados MySQL
const knexConfig = require('../../database_config_knex/knexFile');

//Criar a conexão com o banco de dados MySQL
const knexConex = knex(knexConfig.development);

// Função para inserir uma nova Refeição
const insertRefeicao = async function(refeicao) {
    try {
        const sql = `insert into tbl_refeicao(
            nome,
            descricao,
            modo_preparo,
            apoio_decisao,
            img,
            id_tipo_refeicao,
            id_publico_alvo,
            id_adm
        ) values (?, ?, ?, ?, ?, ?, ?, ?);`;
 
        const result = await knexConex.raw(sql, [
            refeicao.nome,
            refeicao.descricao,
            refeicao.modo_preparo,
            refeicao.apoio_decisao,
            refeicao.img,
            refeicao.id_tipo_refeicao,
            refeicao.id_publico_alvo,
            refeicao.id_adm
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

// Função para atualizar uma Refeição existente (inclusive a imagem)
const updateRefeicao = async function(refeicao) {
    try {
        const sql = `update tbl_refeicao set
            nome = ?,
            descricao = ?,
            modo_preparo = ?,
            apoio_decisao = ?,
            img = ?,
            id_tipo_refeicao = ?,
            id_publico_alvo = ?,
            id_adm = ?
        where id = ?;`;
 
        const result = await knexConex.raw(sql, [
            refeicao.nome,
            refeicao.descricao,
            refeicao.modo_preparo,
            refeicao.apoio_decisao,
            refeicao.img,
            refeicao.id_tipo_refeicao,
            refeicao.id_publico_alvo,
            refeicao.id_adm,
            refeicao.id
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

//Função para retornar todos os dados da tabela de Refeiçao
const selectAllRefeicao = async function() {

    try {
        
        //Script para retornar todos os tipos de Refeições
        let sql = `select * from tbl_refeicao order by id desc`

        //Executa no banco de dados o script SQL para retornar os tipos de refeições
        let result = await knexConex.raw(sql)


        //Validação para verificar se o retorno do Banco é um Array
        //Se o script SQL der erro, o Banco não devolve um Array
        if (Array.isArray(result)) {
            return result[0]
        }else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false
    }
}

//Função para retornar os dados de uma Refeição filtrando por ID
const selectByIdRefeicao = async function(id) {
    
    try {
        
        let sql = `select * from tbl_refeicao where id=${id}`

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

//Função para excluir uma refeição pelo ID
const deleteRefeicao = async function(id) {
    try {
        let sql = `delete from tbl_refeicao where id = ${id}`
    
        let result = await knexConex.raw(sql)
        
        if(result){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}
module.exports = {
    insertRefeicao,
    updateRefeicao,
    selectAllRefeicao,
    selectByIdRefeicao,
    deleteRefeicao
}