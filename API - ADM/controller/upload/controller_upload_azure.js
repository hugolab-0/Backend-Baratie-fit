/*******************************************************************************************************
 * 
 * Objetivo: Stub TEMPORÁRIO do upload de imagens da Refeição.
 * 
 * O SAS Token do Azure está expirado (conta ainda não configurada de forma definitiva).
 * Enquanto isso, esta função retorna sempre uma URL de imagem padrão (presetada), só para não
 * travar o cadastro/atualização de refeições durante o desenvolvimento.
 * 
 * IMPORTANTE: quando tiver uma conta Azure de verdade (ou um SAS Token válido), volte a usar a
 * implementação real do upload (a que faz o PUT para o Blob Storage). A ASSINATURA da função
 * (uploadfiles) é a mesma, então não precisa mexer em mais nada.
 * 
 * Autor: Geovane
 * Versão: 0.1 (stub)
 * 
 *******************************************************************************************************/

// URL da imagem padrão usada enquanto o upload para o Azure não está configurado.
// Pode trocar por qualquer outra imagem (ex: uma imagem hospedada no próprio projeto).
const IMAGEM_PRESETADA = 'https://via.placeholder.com/600x400.png?text=Imagem+da+Refei%C3%A7%C3%A3o';


// Função que "simula" o upload do arquivo, retornando sempre a imagem padrão (presetada)
// Mantém a mesma assinatura (recebe o file do multer) que a implementação real do Azure usa
const uploadfiles = async function (file) {

    try {
        // TODO: voltar a usar a implementação real do Azure quando o SAS Token for renovado
        console.log('[AVISO] SAS Token do Azure expirado/indisponível - usando imagem presetada.');

        return IMAGEM_PRESETADA;

    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    uploadfiles
}
