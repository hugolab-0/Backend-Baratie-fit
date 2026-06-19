// ======================================================================
// IMPORTAÇÃO DE DEPENDÊNCIAS
// ======================================================================
const express   = require('express')
const cors      = require('cors')
const multer    = require('multer')
const path      = require('path')

//Configuração para o multer enviar o arquivo de imagem
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    }
})

//Instância para criar um objeto upload
const upload = multer()

// ======================================================================
// IMPORTAÇÃO DAS ROTAS
// ======================================================================
// FIX: removidos os imports de controllers daqui — controllers são importados pelas rotas, não pelo app.js

const alimentoRoutes            = require('./rotas/alimento/alimento_routes.js')
const refeicaoRoutes            = require('./rotas/refeicao/refeicao_routes.js')
const ADMRoutes                 = require('./rotas/adm/adm.routes.js')
const refeicaoAlimentoRoutes    = require('./rotas/refeicao_alimento/refeicao_alimento.routes.js')

// Rotas de dados estáticos (somente listagem)
const tipoRefeicaoRoutes        = require('./rotas/tipo_refeicao/tipo_refeicao_routes.js')
const publicoAlvoRoutes         = require('./rotas/publico_alvo/publico_alvo_routes.js')
const restricaoRoutes           = require('./rotas/restricao/restricao_routes.js')

// ======================================================================
// CONFIGURAÇÃO DA API
// ======================================================================

const app  = express()
app.use(express.json())
const PORT = process.env.PORT || 8080

// ======================================================================
// CONFIGURAÇÃO DO CORS
// ======================================================================

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))

// ======================================================================
// ENDPOINTS
// ======================================================================

app.use('/v1/baratiefit/alimento', alimentoRoutes)
app.use('/v1/baratiefit/adm', ADMRoutes)
app.use('/v1/baratiefit/refeicao/alimento', refeicaoAlimentoRoutes)
app.use('/v1/baratiefit/refeicao', refeicaoRoutes)
app.use('/v1/baratiefit/tipo_refeicao', tipoRefeicaoRoutes)
app.use('/v1/baratiefit/publico_alvo', publicoAlvoRoutes)
app.use('/v1/baratiefit/restricao', restricaoRoutes)
app.use('/uploads/refeicoes', express.static(path.join(__dirname, 'uploads', 'refeicoes')))

// ======================================================================
// INICIALIZAÇÃO DO SERVIDOR
// ======================================================================
app.listen(PORT, function() {
    console.log(`Servidor rodando na porta ${PORT}`)
})