// Import das dependências
const express = require('express')
const router = express.Router()

const upload = require('../../controller/upload/controller_upload_multer_config.js')
const uploadAzure = require('../../controller/upload/controller_upload_azure.js')
const controllerRefeicao = require('../../controller/refeição/refeicao_controller.js')

// =====================================
// POST - Cadastrar refeição com imagem
// =====================================
router.post(
    '/',
    function(request, response, next) {
        upload.single('img')(request, response, function(err) {
            if (err) {
                return response.status(400).json({
                    status: false,
                    status_code: 400,
                    message: err.message
                })
            }

            next()
        })
    },

    async function(request, response) {
        try {
            let dados = request.body

            if (request.file) {
                let urlFile = await uploadAzure.uploadfiles(request.file)

                if (urlFile) {
                    dados.img = urlFile
                } else {
                    return response.status(500).json({
                        status: false,
                        status_code: 500,
                        message: 'Falha ao enviar imagem para o Azure'
                    })
                }
            }

            let result = await controllerRefeicao.inserirRefeicao(
                dados,
                request.headers['content-type'],
                request.file
            )

            response.status(result.status_code)
            response.json(result)

        } catch (error) {
            response.status(500).json({
                status: false,
                status_code: 500,
                message: error.message
            })
        }
    }
)

// =====================================
// GET - Listar todas as refeições
// =====================================
router.get('/', async function(request, response) {
    try {
        let result = await controllerRefeicao.listarRefeicoes()

        response.status(result.status_code)
        response.json(result)

    } catch (error) {
        response.status(500).json({
            status: false,
            status_code: 500,
            message: error.message
        })
    }
})

// =====================================
// GET - Buscar refeição por ID
// =====================================
router.get('/:id', async function(request, response) {
    try {
        let id = request.params.id

        let result = await controllerRefeicao.buscarRefeicao(id)

        response.status(result.status_code)
        response.json(result)

    } catch (error) {
        response.status(500).json({
            status: false,
            status_code: 500,
            message: error.message
        })
    }
})

// =====================================
// PUT - Atualizar refeição
// =====================================
router.put(
    '/:id',
    function(request, response, next) {
        upload.single('img')(request, response, function(err) {
            if (err) {
                return response.status(400).json({
                    status: false,
                    status_code: 400,
                    message: err.message
                })
            }

            next()
        })
    },

    async function(request, response) {
        try {
            let dados = request.body
            dados.id = request.params.id

            if (request.file) {
                let urlFile = await uploadAzure.uploadfiles(request.file)

                if (urlFile) {
                    dados.img = urlFile
                } else {
                    return response.status(500).json({
                        status: false,
                        status_code: 500,
                        message: 'Falha ao enviar imagem para o Azure'
                    })
                }
            }

            let result = await controllerRefeicao.atualizarRefeicao(
                dados,
                request.params.id,
                request.headers['content-type']
            )

            response.status(result.status_code)
            response.json(result)

        } catch (error) {
            response.status(500).json({
                status: false,
                status_code: 500,
                message: error.message
            })
        }
    }
)

// =====================================
// DELETE - Excluir refeição
// =====================================
router.delete('/:id', async function(request, response) {
    try {
        let id = request.params.id

        let result = await controllerRefeicao.excluirRefeicao(id)

        response.status(result.status_code)
        response.json(result)

    } catch (error) {
        response.status(500).json({
            status: false,
            status_code: 500,
            message: error.message
        })
    }
})

module.exports = router