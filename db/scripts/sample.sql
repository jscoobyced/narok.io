USE `narokio`;

LOCK TABLES `user` WRITE;
INSERT INTO `user` VALUES (1,'Administrator','admin@narok.io','123456789','2020-05-10 17:37:24','2020-05-10 17:37:24', 0);
UNLOCK TABLES;

LOCK TABLES `blog` WRITE;
INSERT INTO `blog` VALUES (1,'narok.io is live!',1,'2020-05-10 17:37:24','2020-05-10 17:37:24', 0);
INSERT INTO `blog` VALUES (2,'What''s coming',1,'2020-05-10 17:42:37','2020-05-10 17:42:37', 0);
UNLOCK TABLES;

LOCK TABLES `blog_content` WRITE;
INSERT INTO `blog_content` VALUES 
(1,1,0,'This is deleted so should not be sent to client.','', 0, 1)
,(2,1,0,'After about 2 months of little and regular efforts, this first read-only version of the website is live. I will be posting updates soon.','', 0, 0)
,(3,2,0,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies ut augue eu imperdiet. Donec tincidunt congue tortor, eu finibus ex facilisis ut. Etiam aliquam augue non magna commodo auctor. Phasellus nec tellus egestas, gravida ipsum nec, semper augue. In facilisis quam purus, congue egestas augue gravida at. Aenean et justo placerat, ultrices nisi sit amet, molestie risus. Duis eu nulla eget nisi interdum interdum. Curabitur ornare vel odio rhoncus aliquet. Praesent luctus rutrum pharetra. Nullam sed eros pharetra urna porttitor viverra. Nulla facilisi. Sed molestie sodales rhoncus. Cras gravida porttitor nulla ac suscipit. Suspendisse sed neque nunc. Praesent ac varius nisi. Donec suscipit elit sit amet eros scelerisque tempor. Curabitur bibendum turpis id rhoncus ultricies. Maecenas hendrerit finibus felis, ac lobortis ex vestibulum sit amet. Donec condimentum aliquet nulla, sed scelerisque orci. Phasellus massa felis, maximus eget dolor ut, dapibus semper ante. Cras non neque lectus. Suspendisse nec erat nec nulla pretium ultricies.','Lorem ipsum dolor sit amet',0, 0)
,(4,2,1,'/images/demon-logo-small.png','Demon logo',1, 0);
UNLOCK TABLES;
