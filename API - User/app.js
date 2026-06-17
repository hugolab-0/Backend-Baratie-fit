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



//iniciando a API para receber requisições
app.listen(8080, function(){ //decidindo a porta para saída do conteúdo
    console.log("API funcionando e aguardando requisições...") //vai mostrar no terminal que a API já está funcionando
})