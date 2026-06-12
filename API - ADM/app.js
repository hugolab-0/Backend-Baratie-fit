// ======================================================================
// IMPORTAÇÃO DE DEPENDÊNCIAS
// ======================================================================

// Framework principal da API
const express = require('express')

// Permite requisições de diferentes origens (CORS)
const cors = require('cors')



// ======================================================================
// IMPORTAÇÃO DOS CONTROLLERS
// ======================================================================


const controllerAlimento = require('./controller/alimento/alimento.js')

const alimentoRoutes = require('./rotas/alimento.routes.js')

const controllerRefeicao = require('./controller/refeição/refeicao_controller.js')

const refeicaoRoutes = require('./rotas/refeicao/refeicao_rota.js')

// ======================================================================
// CONFIGURAÇÃO DA API
// ======================================================================

// Middleware para receber JSON
//const bodyParserJSON = bodyParser.json()

// Instância do Express
const app = express()

// Porta da aplicação
const PORT = process.env.PORT || 8080


// ======================================================================
// CONFIGURAÇÃO DO CORS
// ======================================================================

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization']
}

// Aplicação das permissões CORS
app.use(cors(corsOptions))


// ======================================================================
// ENDPOINTS - ALIMENTO
// ======================================================================

// Cadastrar filme
app.use('/v1/baratiefit/alimento', cors(),  alimentoRoutes)


app.use('/v1/baratiefit/refeicao', cors(), refeicaoRoutes)




app.listen(PORT, function() {
    console.log(`Servidor rodando na porta ${PORT}`)
})

