const knex = require('knex');

const knexConfig = require('../../database_config_knex/knexFile');

const knexConex = knex(knexConfig.development);


const insertRefeicao = async function(refeicao) {
        try {
            const sql = `insert into tbl_refeicao(
                nome,
                descricao,
                modo_preparo,
                apoio_decisao,
                id_tipo_refeicao,
                id_publico_alvo,
                id_adm
            ) values (
                '${refeicao.nome}',
                '${refeicao.descricao}',
                '${refeicao.modo_preparo}',
                '${refeicao.apoio_decisao}',
                ${refeicao.id_tipo_refeicao},
                ${refeicao.id_publico_alvo},
                ${refeicao.id_adm}
            );`;

            const result = await knexConex.raw(sql);

            if(result)
                return result[0].insertId // Retorna o ID gerado no BD
            else
                return false

        } catch (error) {
            
        }
}

module.exports = {
    insertRefeicao
}