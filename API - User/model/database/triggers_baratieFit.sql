#########   INSERÇÃO DAS TRIGGERS   #########

-- Criamos um delimitador para criar as triggers, geralmente atribuimos um caracter que não existe no banco de dados, é uma forma do banco de dados não se perde durante a execução da trigger
-- Trigger responsável por deletar um alimento
DELIMITER $
-- Cria-se a trigger e nomeia-se com algo relacionado as ações nas tabelas envolvidas
create trigger tgr_delete_alimento_refeicao
	before delete on tbl_alimento
		for each row -- Para cada linha encontrada
			BEGIN
				delete from tbl_refeicao_alimento
					where id_alimento = old.id;
            END$
            
            

 -- Trigger responsável por deletar uma refeição            
 DELIMITER $
 create trigger tgr_refeicao_alimento
	before delete on tbl_refeicao
		for each row
			BEGIN
				delete from tbl_refeicao_alimento
					where id_refeicao = old.id;
			END$
            
            
            
 -- Trigger responsável por deletar um adm          
 DELIMITER $
 create trigger tgr_adm_refeicao_alimento
	before delete on tbl_adm
		for each row
			BEGIN
				delete from tbl_alimento
					where id_adm = old.id;
				delete from tbl_refeicao
					where id_adm = old.id;
			END$