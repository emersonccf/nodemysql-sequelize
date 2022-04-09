#
# Structure for table "clientes"
#

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `cpf` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "clientes"
#

INSERT INTO `clientes` VALUES 
(1,'Carlos Almeida','12345678901','2022-04-07 01:23:22','2022-04-07 01:23:22'),
(2,'Ana Santos','09876543210','2022-04-07 01:27:14','2022-04-07 01:27:14'),
(3,'Emerson Ferreira','12312312399','2022-04-07 01:28:19','2022-04-07 01:28:19');
