const knex = require('knex');
const knexConfig = require('../..//database_config_knex/knexFile');
const knexConex = knex(knexConfig.development);

const insertRefeicaoAlimentacao = async function (refeicaoAlimentacao) {

    try {
        let result = await knexConex('tbl_refeicaoAlimentacao').insert({
            id_refeicao: refeicaoAlimentacao.id_refeicao,
            id_alimentacao: refeicaoAlimentacao.id_alimentacao,
            quantidade_gramas: refeicaoAlimentacao.quantidade_gramas
        });

        if(result) return result[0];
        else return false;
        
    } catch (error) {
        console.log(error);
        return false;
    }
}