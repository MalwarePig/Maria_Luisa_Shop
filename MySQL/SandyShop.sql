CREATE DATABASE SandyShop;

USE SandyShop;


CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(15) DEFAULT NULL,
  `pass` varchar(15) DEFAULT NULL,
	level varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

DELETE FROM login WHERE id >1

INSERT INTO login(username,pass,level)VALUES('admin','admin','admin')
 SELECT * FROM login
 
CREATE TABLE `Socio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(60) DEFAULT NULL,
  `addres` VARCHAR(120) DEFAULT NULL,
	phone varchar(15) DEFAULT NULL,
	Referencia varchar(15) DEFAULT NULL, 
	idLogin varchar(15) DEFAULT NULL,
	status varchar(15) DEFAULT 'activa',
  PRIMARY KEY (`id`)
)
