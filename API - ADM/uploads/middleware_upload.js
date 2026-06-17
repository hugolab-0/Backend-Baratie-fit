// ======================================================================
// Configuração do Multer para upload de imagens de Refeição
// ======================================================================
const multer = require('multer')
const path = require('path')

const fs = require('fs')

const pastaDestino = path.join(__dirname, 'refeicoes')
if (!fs.existsSync(pastaDestino)) {
    fs.mkdirSync(pastaDestino, { recursive: true })
}

// Define onde e com qual nome o arquivo será salvo
const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, path.join(__dirname, 'refeicoes'))
    },
    filename: function (request, file, callback) {
        const extensao = path.extname(file.originalname)
        const nomeUnico = `refeicao_${Date.now()}${extensao}`
        callback(null, nomeUnico)
    }
})

// Filtra apenas arquivos de imagem
const fileFilter = function (request, file, callback) {
    const tiposPermitidos = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

    if (tiposPermitidos.includes(file.mimetype)) {
        callback(null, true)
    } else {
        callback(new Error('Formato de imagem não suportado. Use PNG, JPG ou WEBP.'), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // limite de 5MB por imagem
    }
})

module.exports = upload