-- ==================================================================
-- ARQUIVO REPONSÁVEL PELA INSERÇÃO DE DADOS NAS TABELAS DO PROJETO
-- ==================================================================


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



-- Insercao de dados na tabela de adm
insert into tbl_adm(nome, email, senha, ultimo_acesso, id_nivel_acesso)
values(	"admin",
		"admin@gmail.com",
        "admin",
        "2026-06-17",
        1
        );
        
        

-- Inserção de dados na tabela de alimentos        
insert into tbl_alimento(nome, descricao, proteinas_g, carboidratos_g, lipidios_g, fibras_g, acucar_adicionado_g, gorduras_trans_g, gorduras_saturadas_g, id_categoria, id_adm, id_enquadramento)
values(	"Peito de frango cozido sem pele",
		"Porção de 100 gramas de peito de frango cozido sem pele com temperos secos",
		32,
        1,
		3,
        0,
        0,
        0,
        1,
        3,
        2,
        10
        );
        
        

-- Inserção de dados na tabela de refeições
insert into tbl_refeicao(nome, descricao, modo_preparo, apoio_decisao, img, id_tipo_refeicao, id_publico_alvo, id_adm)
values(	"A moda do Sanji",
		"A moda do Sanji é uma refeição pensada em agilidade em dias corridos para gerar saciedade com alimentos nutritivos",
		"Cozinhe o peito de frango por volta de 25 minutos em uma panela de pressão em fogo médio, logo após desfie-o e adicione temperos secos a gosto, dentre os quais chimichurri defumado, tempero baiano e páprica defumada",
        "Uma ótima opção de alimento para gerar saciedade, com um alto teor de proteína e um baixo teor de gordura",
        "https://swiftbr.vteximg.com.br/arquivos/ids/210980/621236-peito-de-frango-temperado-desfiado_rec.jpg?v=638943223429630000",
        2,
        2,
        1
        );
        
        
        
-- Inserção de dados na tabela de refeição_alimento
insert into tbl_refeicao_alimento(quantidade_g, unidade_medida, id_refeicao, id_alimento)
values(	
	100,
    "gramas",
    1,
    1
);