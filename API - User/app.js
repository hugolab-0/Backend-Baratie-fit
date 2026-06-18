/********************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto integrador.
 * Data: 12/06/2026
 * Autor: Lucas Dias Brandão Kolle
 * Versão: 1.0.06.26
 *******************************************************************************************************************************************************************************************/
 

/*
    Instalação do EXPRESS       - npm install express --save
        Dependencia responsável pela utilização do protocolo HTTP para criar uma API (A istalação deve ser feita na dominancia do app.js (raiz do projeto))

    Instalação do CORS          - npm install cors --save
        Dependencia responsável pelas configurações a serem realizadas para permissão de acesso da API (A istalação deve ser feita na dominancia do app.js (raiz do projeto))

    Instalação do BODY-PARSER    - npm install body-parser --save
*/



//importando as dependencias
const express       = require("express")
const cors          = require("cors")
const bodyParser    = require("body-parser")

//criando um objeto para manipular o express
const app = express()

//conjunto de permissões a serem aplicados no CORS da API
const corsOption = {
    origin: ["*"], //A origrm da requisição (definido por meio do IP (192.168...), quando colocado o "*" fica livre para todas as máquinas)
    methods: "GET, POST, PUT, DELETE, OPTION", //são os verbos permitidos para serem utilizados na API
    allowedHeaders: ["content-type", "Autorizations"] //são permissões do cabeçalho do CORS
}

//configurando as permissões da API atravez do CORS
app.use(cors(corsOption))



/* SESSÃO DOS TIPOS DE REFEIÇÃO */

//importando o arquivo onde estão as rotas da tabela dos tipos de refeição
const tipoRefeicaoRouter = require("./routes/tipo_refeicao_routes.js")

//definindo a rota para acessar as rotas do generoRouter (o cors() é para liberar o acesso a essa rota, caso contrário, o navegador bloqueia por questões de segurança)
app.use("/v1/baratie/tipo/refeicao", cors(), tipoRefeicaoRouter)




/* SESSÃO DOS PUBLICOS ALVOS */

//importando o arquivo onde estão as rotas do publico alvo
const publicoAlvoRouter = require("./routes/publico_alvo_routes.js")

//definindo a rota para acessar as rotas do generoRouter (o cors() é para liberar o acesso a essa rota, caso contrário, o navegador bloqueia por questões de segurança)
app.use("/v1/baratie/publico/alvo", cors(), publicoAlvoRouter)



/* SESSÃO DAS RESTRIÇÕES */

//importando o arquivo onde estão as rotas das restrições
const restricaoRouter = require("./routes/restricao_routes.js")

//definindo a rota para acessar as rotas do generoRouter (o cors() é para liberar o acesso a essa rota, caso contrário, o navegador bloqueia por questões de segurança)
app.use("/v1/baratie/restricao", cors(), restricaoRouter)




/* SESSÃO DAS CATEGORIAS DOS ALIMENTOS */

//importando o arquivo onde estão as rotas das categorias dos alimentos
const categoriaAlimentoRouter = require("./routes/categoria_alimento_routes.js")

//definindo a rota para acessar as rotas do generoRouter (o cors() é para liberar o acesso a essa rota, caso contrário, o navegador bloqueia por questões de segurança)
app.use("/v1/baratie/categoria/alimento", cors(), categoriaAlimentoRouter)




/* SESSÃO DE ENQUADRAMENTOS */

//importando o arquivo onde estão as rotas dos enquadramentos
const enquadramentoRouter = require("./routes/enquadramento_routes.js")

//definindo a rota para acessar as rotas do generoRouter (o cors() é para liberar o acesso a essa rota, caso contrário, o navegador bloqueia por questões de segurança)
app.use("/v1/baratie/enquadramento", cors(), enquadramentoRouter)



/* SESSÃO DO NIVEL DE ACESSO */

//importando o arquivo onde estão as rotas do nivel de acesso
const nivelAcessoRouter = require("./routes/nivel_acesso_routes.js")

//definindo a rota para acessar as rotas do generoRouter (o cors() é para liberar o acesso a essa rota, caso contrário, o navegador bloqueia por questões de segurança)
app.use("/v1/baratie/nivel/acesso", cors(), nivelAcessoRouter)



/* SESSÃO DE REFEIÇÃO */

//importando o arquivo onde estão as rotas do nivel de acesso
const refeicaoRouter = require("./routes/refeicao_routes.js")

//definindo a rota para acessar as rotas do generoRouter (o cors() é para liberar o acesso a essa rota, caso contrário, o navegador bloqueia por questões de segurança)
app.use("/v1/baratie/refeicao", cors(), refeicaoRouter)



/* SESSÃO DE ALIMENTO */

//importando o arquivo onde estão as rotas do nivel de acesso
const alimentoRouter = require("./routes/alimento_routes.js")

//definindo a rota para acessar as rotas do generoRouter (o cors() é para liberar o acesso a essa rota, caso contrário, o navegador bloqueia por questões de segurança)
app.use("/v1/baratie/alimento", cors(), alimentoRouter)



/* SESSÃO DE ADMINISTRADOR */

//importando o arquivo onde estão as rotas do nivel de acesso
const admRouter = require("./routes/adm_routes.js")

//definindo a rota para acessar as rotas do generoRouter (o cors() é para liberar o acesso a essa rota, caso contrário, o navegador bloqueia por questões de segurança)
app.use("/v1/baratie/adm", cors(), admRouter)



/* SESSÃO DE REFEIÇÃO E ALIMENTO */

//importando o arquivo onde estão as rotas do nivel de acesso
const refeicaoAlimentoRouter = require("./routes/refeicao_alimento_routes.js")

//definindo a rota para acessar as rotas do generoRouter (o cors() é para liberar o acesso a essa rota, caso contrário, o navegador bloqueia por questões de segurança)
app.use("/v1/baratie/refeicao/alimento", cors(), refeicaoAlimentoRouter)



/* SESSÃO DE REFEIÇÃO E RESTRICAO */

//importando o arquivo onde estão as rotas do nivel de acesso
const refeicaoRestricaoRouter = require("./routes/refeicao_restricao_routes.js")

//definindo a rota para acessar as rotas do generoRouter (o cors() é para liberar o acesso a essa rota, caso contrário, o navegador bloqueia por questões de segurança)
app.use("/v1/baratie/refeicao/restricao", cors(), refeicaoRestricaoRouter)



/* SESSÃO DE AJUDA (HELP) */

//retorna os endPoints disponíveis e uma pequena descrição
app.get("/v1/baratie/help", function(request, response){

    //criando documentação auxiliar da API
    let helpAPI = {
        "API-description": "API para alimentar o site BaratieFit.",
        "date": "2026-06-17",
        "Development": "Lucas Dias Brandão Kolle",
        "email": "lucaskolle2020@gmail.com",
        "Version": "1.0.06.26",
        "endPoints": [
            {
                "id": 1,
                "Rota": "/v1/baratie/tipo/refeicao",
                "Description": "Retorna todos os tipos de refeição cadastrados."
            },
            {
                "id": 2,
                "Rota": "/v1/baratie/tipo/refeicao/{id}",
                "Description": "Retorna um tipo de refeição específico filtrando pelo ID."
            },
            {
                "id": 3,
                "Rota": "/v1/baratie/publico/alvo",
                "Description": "Retorna todos os públicos-alvo cadastrados."
            },
            {
                "id": 4,
                "Rota": "/v1/baratie/publico/alvo/{id}",
                "Description": "Retorna um público-alvo específico filtrando pelo ID."
            },
            {
                "id": 5,
                "Rota": "/v1/baratie/restricao",
                "Description": "Retorna todas as restrições alimentares cadastradas."
            },
            {
                "id": 6,
                "Rota": "/v1/baratie/restricao/{id}",
                "Description": "Retorna uma restrição alimentar específica filtrando pelo ID."
            },
            {
                "id": 7,
                "Rota": "/v1/baratie/categoria/alimento",
                "Description": "Retorna todas as categorias de alimentos cadastradas."
            },
            {
                "id": 8,
                "Rota": "/v1/baratie/categoria/alimento/{id}",
                "Description": "Retorna uma categoria de alimento específica filtrando pelo ID."
            },
            {
                "id": 9,
                "Rota": "/v1/baratie/enquadramento",
                "Description": "Retorna todos os enquadramentos cadastrados."
            },
            {
                "id": 10,
                "Rota": "/v1/baratie/enquadramento/{id}",
                "Description": "Retorna um enquadramento específico filtrando pelo ID."
            },
            {
                "id": 11,
                "Rota": "/v1/baratie/nivel/acesso",
                "Description": "Retorna todos os níveis de acesso cadastrados."
            },
            {
                "id": 12,
                "Rota": "/v1/baratie/nivel/acesso/{id}",
                "Description": "Retorna um nível de acesso específico filtrando pelo ID."
            },
            {
                "id": 13,
                "Rota": "/v1/baratie/refeicao",
                "Description": "Retorna todas as refeições cadastradas."
            },
            {
                "id": 14,
                "Rota": "/v1/baratie/refeicao/{id}",
                "Description": "Retorna uma refeição específica filtrando pelo ID."
            },
            {
                "id": 15,
                "Rota": "/v1/baratie/alimento",
                "Description": "Retorna todos os alimentos cadastrados."
            },
            {
                "id": 16,
                "Rota": "/v1/baratie/alimento/{id}",
                "Description": "Retorna um alimento específico filtrando pelo ID."
            },
            {
                "id": 17,
                "Rota": "/v1/baratie/adm",
                "Description": "Retorna todos os administradores cadastrados."
            },
            {
                "id": 18,
                "Rota": "/v1/baratie/adm/{id}",
                "Description": "Retorna um administrador específico filtrando pelo ID."
            },
            {
                "id": 19,
                "Rota": "/v1/baratie/refeicao/alimento",
                "Description": "Retorna todos os relacionamentos entre refeições e alimentos."
            },
            {
                "id": 20,
                "Rota": "/v1/baratie/refeicao/alimento/{id}",
                "Description": "Retorna um relacionamento específico entre refeição e alimento filtrando pelo ID."
            },
            {
                "id": 21,
                "Rota": "/v1/baratie/refeicao/restricao",
                "Description": "Retorna todos os relacionamentos entre refeições e restrições alimentares."
            },
            {
                "id": 22,
                "Rota": "/v1/baratie/refeicao/restricao/{id}",
                "Description": "Retorna um relacionamento específico entre refeição e restrição filtrando pelo ID."
            },
            {
                "id": 23,
                "Rota": "/v1/baratie/help",
                "Description": "Retorna a documentação da API com os endPoints disponíveis."
            }
        ]
    }

    response.status(200)
    response.json(helpAPI)
})



//iniciando a API para receber requisições
app.listen(8080, function(){ //decidindo a porta para saída do conteúdo
    console.log("API funcionando e aguardando requisições...") //vai mostrar no terminal que a API já está funcionando
})