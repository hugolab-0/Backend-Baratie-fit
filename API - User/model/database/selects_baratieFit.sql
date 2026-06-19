-- ============================================================
-- ARQUIVO PARA REALIZAR OS FILTROS PERSONALIZADOS DO PROJETO 
-- ============================================================


-- ***** REALIZANDO A BUSCA DE UMA REFEIÇÃO PELO NOME *****
select * from tbl_refeicao where tbl_refeicao.nome like "%A%";


-- **** REALIZANDO ORGANIZAÇÃO POR QUANTIDADE DE CALORIAS (CRESCENTE / DESCERSCENTE)
	
show tables;
desc tbl_refeicao;
select * from tbl_refeicao;