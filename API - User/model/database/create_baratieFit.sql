-- ==========================================================
-- ARQUIVO DE CRIAÇÃO DO BANCO E DAS TABELA DO PROJETO
-- ==========================================================


-- ***** CRIANDO BANCO DE DADOS *****

# Cria o database do projeto de baratiefit
create database db_baratiefit_2028;

# Ativa o uso do database do produto
use db_baratiefit_2028;


-- ***** CRIANDO TABELAS *****

-- Cria a tabela de alimento
create table tbl_alimento(
    id int not null primary key auto_increment,
    nome varchar(100) not null,
    descricao text,
    carboidratos_g          decimal(8,2) not null,
    proteinas_g             decimal(8,2) not null,
    lipidios_g              decimal(8,2) not null,
    fibras_g                decimal(8,2) not null,
    acucar_adicionado_g     decimal(8,2) not null,
    gorduras_trans_g        decimal(8,2) not null,
    gorduras_saturadas_g    decimal(8,2) not null,
    unidade_medida			varchar(20) not null
);



-- Cria a tabela de refeicao
create table tbl_refeicao(
    id int not null primary key auto_increment,
    nome varchar(100) not null,
    descricao       text,
    modo_preparo    text,
    apoio_decisao   text,
    img varchar(255) not null
);



-- Cria a tabela de refeicao relacionada com alimento
create table tbl_refeicao_alimento(
    id int not null primary key auto_increment,
    quantidade_g decimal(8,2),
    unidade_medida varchar(20) not null
);



-- Cria a tabela de adm
create table tbl_adm(
    id int not null primary key auto_increment,
    nome  varchar(100) not null,
    email varchar(255) not null,
    senha varchar(512) not null,
    ultimo_acesso datetime
);



-- Cria a tabela de tipo_refeicao
create table tbl_tipo_refeicao(
    id int not null primary key auto_increment,
    nome varchar(50)
);



-- Cria a tabela de publico alvo
create table tbl_publico_alvo(
    id int not null primary key auto_increment,
    nome varchar(100)
);



-- Cria a tabela de restricao
create table tbl_restricao(
    id int not null primary key auto_increment,
    nome varchar(100),
    descricao varchar(500)
);



-- Cria a tabela de categoria do alimento
create table tbl_categoria_alimento(
    id int not null primary key auto_increment,
    nome varchar(100) not null,
    descricao varchar(500)
);



-- Cria a tabela de enquadramento
create table tbl_enquadramento(
    id int not null primary key auto_increment,
    nome varchar(50) not null
);



-- Cria a tabela de nivel de acesso
create table tbl_nivel_acesso(
    id int not null primary key auto_increment,
    nivel varchar(50) not null
);



-- Cria a tabela de refeicao relacionada com restricao (Tabela com CRUD)
create table tbl_refeicao_restricao(
    id int not null primary key auto_increment,
    id_refeicao  int not null,
    id_restricao int not null,
    
    # Relacao para a refeicao
    constraint FK_REFEICAO_REFEICAORESTRICAO
    foreign key (id_refeicao)
    references tbl_refeicao(id),
    
    # Relacao para a restricao
    constraint FK_RESTRICAO_REFEICAORESTRICAO
    foreign key (id_restricao)
    references tbl_restricao(id)
);


-- ====================================
-- REALIZANDO ALTERAÇÕES NAS TABELAS
-- ====================================


-- Adiciona a FK na tabela de alimento e cria as relacoes
alter table tbl_alimento
    add column id_categoria int not null,
    add constraint FK_CATEGORIA_ALIMENTO
        foreign key (id_categoria)
        references tbl_categoria_alimento(id),
    add column id_adm int not null,
    add constraint FK_ADM_ALIMENTO
        foreign key (id_adm)
        references tbl_adm(id),
    add column id_enquadramento int not null,
    add constraint FK_ENQUADRAMENTO_ALIMENTO
        foreign key (id_enquadramento)
        references tbl_enquadramento(id);



-- Adiciona a FK na tabela de refeicao e cria as relacoes
alter table tbl_refeicao
    add column id_tipo_refeicao int not null,
    add constraint FK_TIPO_REFEICAO_REFEICAO
        foreign key (id_tipo_refeicao)
        references tbl_tipo_refeicao(id),
    add column id_publico_alvo int not null,
    add constraint FK_PUBLICO_ALVO_REFEICAO
        foreign key (id_publico_alvo)
        references tbl_publico_alvo(id),
    add column id_adm int not null,
    add constraint FK_ADM_REFEICAO
        foreign key (id_adm)
        references tbl_adm(id);
 
 
 
-- Adiciona a FK na tabela de adm e cria as relações
alter table tbl_adm
    add column id_nivel_acesso int not null,
    add constraint FK_NIVEL_ACESSO_ADM
        foreign key(id_nivel_acesso)
        references tbl_nivel_acesso(id);
       
       
       
-- Adiciona as FK na tabela de refeição_alimento e faz as relações
alter table tbl_refeicao_alimento
    add column id_refeicao int not null,
    add constraint FK_REFEICAO_REFEICAOALIMENTO
        foreign key(id_refeicao)
        references tbl_refeicao(id),
    add column id_alimento int not null,
    add constraint FK_ALIMENTO_REFEICAOALIMENTO
        foreign key(id_alimento)
        references tbl_alimento(id);