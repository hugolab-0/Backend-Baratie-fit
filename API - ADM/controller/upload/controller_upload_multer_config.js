const multer = require('multer')

// Memory storage: guarda o arquivo em buffer (request.file.buffer),
// que é exatamente o que controller_upload_azure.js espera para enviar pro Azure
const upload = multer({ storage: multer.memoryStorage() })

module.exports = upload