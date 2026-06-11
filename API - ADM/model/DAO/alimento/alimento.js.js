/*******************************************************************************************************
 * 
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela 
 * Alimento
 * Data: 11/06/2026
 * Autor: Geovane
 * Versão: 1.0
 * 
 *******************************************************************************************************/

//Impor da biblioteca para gereniciar o banco de dados MySQL no node.js
const knex = require('knex')

//Import do arquivo de configiração para conexão com o banco de dados MySQL
const knexConfig = require('../../database_config_knex/knexFile.js')

//Criar a conexão com o banco de dados MySQL
const knexConex = knex(knexConfig.development)


//Função para inserir dados na tabela de tipo de Refeições
const insertNewAlimento = async function(alimento) {
    
    try {
        let sql =   `insert into tbl_alimento (
                    nome, 
                    descricao, 
                    carboidratos_g,
                    proteinas_g,
                    lipidios_g,
                    fibras_g,
                    acucar_adicionado_g,
                    gorduras_trans_g,
                    gorduras_saturadas_g
                    )
            values (    '${alimento.nome}',
                        '${alimento.descricao}',
                        if('${alimento.carboidratos_g}' = '', null, '${alimento.carboidratos_g}',
                        '${alimento.proteinas_g}',
                        '${alimento.lipidios_g}',
                        '${alimento.fibras_g}',
                        );`


    //Executar o ScriptSQL no Banco de Dados
    let result = await knexConex.raw(sql)

    if(result)
        return result[0].insertId // Retorna o ID gerado no BD
    else
        return false

    } catch (error) {
        console.log(error);
        return false
    }
}

//Função para atualizar um tipo de Refição da tabela
const updateTipoRefeicao = async function(refeicao) {
    
    try {
        
        //Script para atualizar um tipo de refição já existente na tabela
        let sql = `update tbl_tipo_refeicao set
        nome =          '${refeicao.nome}',
        where id =      '${refeicao.id}';`

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

//Função para retornar todos os dados da tabela de Tipo de Refições
const selectAllTipoRefeicao = async function() {

    try {
        
        //Script para retornar todos os tipos de Refições
        let sql = `select * from tbl_tipo_refeicao order by id desc`

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

//Função para retornar os dados da refeição filtrando por ID
const selectByIdTipoRefeicao = async function(id) {
    
    try {
        
        let sql = `select * from tbl_tipo_refeicao where id=${id}`

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
const deleteTipoRefeicao = async function(id) {
    try {
        let sql = `delete from tbl_tipo_refeicao where id = ${id}`
    
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
    insertNewTipoRefeicao,
    updateTipoRefeicao,
    selectAllTipoRefeicao,
    selectByIdTipoRefeicao,
    deleteTipoRefeicao
}