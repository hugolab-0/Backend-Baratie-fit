# Cria o database do projeto de baratiefit
create database db_baratiefit_2028;

# Ativa o uso do database do produto
use db_baratiefit_2028;

#########   TABELAS CRUDS   #########
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
    gorduras_saturadas_g    decimal(8,2) not null
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
    quantidade_g decimal(8,2)
);

-- Cria a tabela de adm
create table tbl_adm(
    id int not null primary key auto_increment,
    nome  varchar(100) not null,
    email varchar(255) not null,
    senha varchar(512) not null,
    ultimo_acesso datetime
);

-- Insert da tabela de ADM
insert into tbl_adm (
    nome,
    email,
    senha,
    ultimo_acesso,
    id_nivel_acesso
)
values (
    'Administrador',
    'admin@baratiefit.com',
    '123456',
    now(),
    2
);

select * from tbl_adm;

#########   TABELAS DE DADOS ESTATICOS   #########
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

#########   INSERÇÃO DOS DADOS ESTATICOS   #########
-- Insercao de dados da tabela de tipo_refeicao
insert into tbl_tipo_refeicao(nome)
values
("Café da Manhã"),
("Lanche da Manhã"),
("Almoço"),
("Lanche da Tarde"),
("Jantar"),
("Ceia"),
("Pré-Treino"),
("Pós-Treino");

-- Insercao de dados da tabela de publico_alvo
insert into tbl_publico_alvo(nome)
values
('Emagrecimento'),
('Hipertrofia'),
('Manutenção de Peso'),
('Atletas'),
('Sedentários'),
('Vegetarianos'),
('Veganos'),
('Diabéticos'),
('Hipertensos'),
('Idosos'),
('Gestantes'),
('Lactantes'),
('Crianças'),
('Adolescentes');

-- Insercao de dados na tabela de restricao
insert into tbl_restricao(nome, descricao)
values
("Intolerância à Lactose", "Dificuldade na digestão da lactose devido à deficiência da enzima lactase."),
("Doença Celíaca", "Condição autoimune desencadeada pela ingestão de glúten."),
("Alergia ao Leite", "Reação imunológica às proteínas presentes no leite."),
("Alergia ao Ovo", "Reação alérgica causada pelo consumo de ovos."),
("Alergia ao Amendoim", "Reação alérgica provocada pelo consumo de amendoim."),
("Alergia a Frutos do Mar", "Reação alérgica causada pelo consumo de crustáceos e moluscos."),
("Hipertensão", "Necessidade de controle da ingestão de sódio."),
("Diabetes", "Necessidade de controle da ingestão de carboidratos e açúcares.");

-- Insercao de dados da tabela de categoria_alimento
insert into tbl_categoria_alimento(nome, descricao)
values
("Carboidrato Simples", "Carboidratos de rápida absorção que fornecem energia imediata."),
("Carboidrato Complexo", "Carboidratos de absorção lenta, ricos em fibras e energia sustentada."),
("Proteína Animal", "Alimentos proteicos de origem animal."),
("Proteína Vegetal", "Alimentos proteicos de origem vegetal."),
("Legumes", "Vegetais geralmente consumidos cozidos ou refogados."),
("Verduras", "Vegetais folhosos ricos em vitaminas e minerais."),
("Frutas", "Fontes naturais de vitaminas, minerais e fibras."),
("Oleaginosas", "Castanhas, amêndoas e sementes ricas em gorduras saudáveis."),
("Laticínios", "Produtos derivados do leite."),
("Bebidas", "Líquidos destinados ao consumo alimentar."),
("Temperos e Condimentos", "Ingredientes utilizados para saborizar preparações.");

-- Insercao de dados na tabela de enquadramento
insert into tbl_enquadramento(nome)
values
("Doces"), ("Processados"), ("Tuberculos"), ("Raizes"), ("Cereais"), 
("Legumes"), ("Verduras"), ("Leite"), ("Derivados"), ("Aves"), 
("Bovina"), ("Suina"), ("Frutos do mar");

-- Insercao de dados na tabela de nivel_acesso
insert into tbl_nivel_acesso(nivel)
values
("Root"), ("Administrador"), ("Nutricionista"), ("Editor");

INSERT INTO tbl_adm (nome, email, senha, ultimo_acesso, id_nivel_acesso)
VALUES ('Administrador', 'admin@baratiefit.com', '123456', NOW(), 2);

select * from tbl_nivel_acesso;


select * from tbl_enquadramento;

select * from tbl_adm;

#########   ALTER TABLES   #########   
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
ALTER TABLE tbl_adm
    ADD COLUMN id_nivel_acesso INT NOT NULL DEFAULT 2,
    ADD CONSTRAINT FK_NIVEL_ACESSO_ADM
        FOREIGN KEY (id_nivel_acesso)
        REFERENCES tbl_nivel_acesso(id);

        
-- Adiciona as FK na tabela de refeição_alimento e faz as relações
alter table tbl_refeicao_alimento
    add column id_refeicao int not null,
    add constraint FK_REFEICAO_REFEICAOALIMENTO
        foreign key (id_refeicao)
        references tbl_refeicao(id),
    add column id_alimento int not null,
    add constraint FK_ALIMENTO_REFEICAOALIMENTO
        foreign key(id_alimento)
        references tbl_alimento(id);
        
######### FIM #######

DESCRIBE tbl_adm;