//Import do arquivo de confiuração da AZURE
const AZURE = require('../modulo/config_upload_azure.js')

//Import da dependência para realizar uma requisição HTTP pelo node
//const fetch = require('node-fetch').default
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const uploadfiles = async function(file) {
  //Concatena no nome do arquivo a data e a hora
    let fileName = Date.now() + file.originalname  

    //url para enviar para o BD
    let urlFile = `https://${AZURE.ACCOUNT}.blob.core.windows.net/${AZURE.CONTAINER}/${fileName}`

    //url para enviar o arquivo para o container da AZURE
    let urlFileToken = `${urlFile}?${AZURE.TOKEN}`

    let response = await fetch(urlFileToken, {
      method:   'PUT',
      headers:  {
        'x-ms-blob-type' : 'BlockBlob',
        'Content-Type'  : 'application/octet-stream'  
      },
      body: file.buffer
    })

    if(response.status === 201)
      return urlFile
    else
      return false
}

module.exports = {
  uploadfiles
}