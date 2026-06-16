/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela 
 * Refeição
 * Data: 2026-06-15
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

//Função para inserir dados na tabela de ADM
const insertADM = async function(adm) {
    try {
        const sql = `insert into tbl_adm(
            nome,
            email,
            senha,
            ultimo_acesso,
            id_nivel_acesso
        ) values (
            '${adm.nome}',
            '${adm.email}',
            '${adm.senha}',
            '${adm.ultimo_acesso}',
            '${adm.id_nivel_acesso}'
        );`;

        const result = await knexConex.raw(sql);

        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        console.log(error) // ← adicione isso
        return false
    }
}

//Função para atualizar um ADM da tabela
const updateADM = async function(adm) {
    
    try {
        
        //Script para atualizar um ADM já existente na tabela
        let sql = `update tbl_adm set
        nome =                      '${adm.nome}',
        email =                     '${adm.email}',
        senha =                     '${adm.senha}',
        ultimo_acesso =             '${adm.ultimo_acesso}',
        id_nivel_acesso =           '${adm.id_nivel_acesso}'
        where id =                   ${adm.id};`

        //Executa o script no BD
        let result = await knexConex.raw(sql)

        if(result)
            return true
            else
            return false

    } catch (error) {
        console.log(error);
        return false 
    }
}

//Função para retornar todos os dados da tabela de ADM
const selectAllADM = async function() {

    try {
        
        //Script para retornar todos os ADM
        let sql = `select * from tbl_adm order by id desc`

        //Executa no banco de dados o script SQL para retornar os perfis ADM
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

//Função para retornar os dados de um ADM filtrando por ID
const selectByIdADM = async function(id) {
    
    try {
        
        let sql = `select * from tbl_adm where id=${id}`

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

//Função para excluir um ADM pelo ID
const deleteADM = async function(id) {
    try {
        let sql = `delete from tbl_adm where id = ${id}`
    
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
  insertADM,
  updateADM,
  selectAllADM,
  selectByIdADM,
  deleteADM
}