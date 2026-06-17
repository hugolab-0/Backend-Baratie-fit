// ======================================================================
// IMPORTAÇÃO DE DEPENDÊNCIAS
// ======================================================================
const express = require('express')
const cors = require('cors')
const path = require('path')
// ======================================================================
// IMPORTAÇÃO DAS ROTAS
// ======================================================================
// FIX: removidos os imports de controllers daqui — controllers são importados pelas rotas, não pelo app.js
const alimentoRoutes            = require('./rotas/alimento/alimento_routes.js')
const refeicaoRoutes            = require('./rotas/refeicao/refeicao_routes.js')
const ADMRoutes                 = require('./rotas/adm/adm.routes.js')
const refeicaoAlimentoRoutes    = require('./rotas/refeicao_alimento/refeicao_alimento.routes.js')

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
app.use('/uploads/refeicoes', express.static(path.join(__dirname, 'uploads', 'refeicoes')))

// ======================================================================
// INICIALIZAÇÃO DO SERVIDOR
// ======================================================================
app.listen(PORT, function() {
    console.log(`Servidor rodando na porta ${PORT}`)
})