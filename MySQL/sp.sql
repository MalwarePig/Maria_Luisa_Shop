 /*=========================================	REGISTRAR NUEVO Socio=======================================================*/
DELIMITER //
CREATE PROCEDURE `newSocio`( IN vName varchar(200),IN vAddres varchar(200),IN vPhone varchar(200),IN vReferencia varchar(200),IN vUser varchar(200),IN vPass varchar(200))
BEGIN
SET SQL_SAFE_UPDATES = 0;
	INSERT INTO login(username,pass,level)VALUES(vUser,vPass,'Socio');
	SET @Token := (SELECT id From login WHERE username = vUser AND pass = vPass);
	
	INSERT INTO Socio(Name,addres,phone,Referencia,idLogin)VALUES(vName,vAddres,vPhone,vReferencia,@Token );
 
END

SELECT * FROM socio
 /*=========================================	CONSULTAR Socio =======================================================*/
 DELIMITER //
CREATE PROCEDURE `CargarSocios`( )
BEGIN
SELECT C.idLogin, C.Name,C.addres,C.phone,C.typeCard,C.numberCard , U.username, U.pass
	FROM  Socio AS C
JOIN login AS U ON C.idLogin  = U.id;
 
END
 
  /*=========================================	ACTUALIZAR Socio=======================================================*/
DELIMITER //
CREATE PROCEDURE `ActualizarSocio`( IN vName varchar(200),IN vAddres varchar(200),IN vPhone varchar(200),IN vReferencia varchar(200),IN vUser varchar(200),IN vPass varchar(200),IN vidLogin varchar(200))
BEGIN
SET SQL_SAFE_UPDATES = 0;
	UPDATE login SET username = vUser,pass = vPass WHERE id = vidLogin;
	
 	UPDATE Socio SET NAME = vName,addres = vAddres,phone = vPhone,Referencia = vReferencia  WHERE idLogin = vidLogin;
END
 