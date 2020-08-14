USE `narokio`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `reference_id` varchar(64) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `status` int(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
INSERT INTO `user` VALUES (1,'Administrator','admin@narok.io','123456789','2020-05-10 17:37:24','2020-05-10 17:37:24', 0);
UNLOCK TABLES;

ALTER TABLE `blog`
ADD COLUMN `user_id` int(11) NOT NULL
AFTER `title`;

LOCK TABLES `blog` WRITE;
UPDATE `blog` SET `user_id` = 1;
UNLOCK TABLES;


ALTER TABLE `blog`
ADD FOREIGN KEY (user_id) REFERENCES `user` (`id`);