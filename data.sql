-- INSERT INTO `recipes` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `recipeDietaryJoin` (`id`,`recipe_id`,`dietary_id`) VALUES
-- ('','','');
-- INSERT INTO `dietaryReq` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `ingredients` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `ingredientRecipeJoin` (`id`,`recipe_id`,`ingredient_id`) VALUES
-- ('','','');

/*  Execute this file from the command line by typing:
 *    mysql -u root < data.sql
 *  to insert data.*/
USE refrigeratorducer;
DELETE FROM ingredientRecipeJoin WHERE ID > 0;
DELETE FROM recipes WHERE ID > 0;
DELETE FROM basics WHERE ID > 0;
DELETE FROM ingredients WHERE ID > 0;
INSERT INTO ingredients (id,name) VALUES(1,"Salt"),(2,"Pepper"),(3,"Butter"),(5,"Flour"),(6,"Sugar"),(7,"Bread"),(8,"Rice"),(9,"Beans"),(10,"Noodles"),(11,"Onion"),(12,"Potato"),(13,"Carrot"),(14,"Celery"),(15,"Garlic"),(16,"Chicken"),(17,"Chicken Broth"),(18,"Water"),(19,"Milk"),(20,"Egg"),(21,"Cheese"),(22,"Cayenne Pepper"),(23,"Green Onion"),(24,"Bacon"),(25,"Sour Cream"),(26,"Baking Soda"),(27,"Brown Sugar"),(28,"Chocolate Chips"),(29,"Paprika"),(30,"Garlic Powder"),(31,"Tomato Sauce"),(32,"Meatballs"),(33,"Peanut Butter"),(34,"Raisins");
INSERT INTO basics (id,ingredient_id) VALUES(1,1),(2,2),(3,3),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),(11,11),(12,12),(13,13),(14,14),(15,15),(16,18),(17,19),(18,20),(19,26);

INSERT INTO recipes (id, name) VALUES(1,"Toast"),(2,"Buttered Toast"),(3,"Chicken Noodle Soup"),(4,"Baked Potato"),(5,"Mashed Potatoes"),(6,"Baked Potato with Butter"),(7,"Bloomin' Onion"),(8,"Onion Rings"),(9,"Chicken and Rice"),(10,"Rice and Beans"),(11,"Plain Spaghetti"),(12,"Scrambled Eggs"),(13,"Cheese Omelet"),(14,"Grilled Cheese"),(15,"Loaded Baked Potato"),(16,"Bacon"),(17,"Rice"),(18,"Cookies"),(19,"Chocolate!"),(20,"Fried Chicken"),(21,"Beans"),(22,"Spaghetti with Meatballs"),(23,"Celery Sticks"),(24,"Ants on a Log");

INSERT INTO ingredientRecipeJoin (id, recipe_id, ingredient_id)
VALUES(1,1,7),
(2,2,7),(3,2,3),
(4,3,16),(5,3,17),(6,3,18),(7,3,15),(8,3,10),(9,3,13),(10,3,14),
(11,4,12),
(12,5,12),(13,5,15),(14,5,1),(15,5,2),(16,5,3),(17,5,19),
(18,6,12),(19,6,3),
(20,7,11),(21,7,5),(22,7,20),(23,7,1),(24,7,2),(39,7,22),
(25,8,11),(26,8,5),(27,8,20),
(28,9,16),(29,9,8),(30,9,18),
(31,10,8),(32,10,9),(33,10,18),
(34,11,10),(35,11,18),
(36,12,20),
(37,13,20),(38,13,21),
(40,14,3),(41,14,7),(42,14,21),
(43,15,12),(44,15,1),(45,15,2),(46,15,21),(47,15,23),(48,15,24),(49,15,25),
(50,16,24),
(51,17,8),(52,17,18),
(53,18,5),(54,18,6),(55,18,19),(56,18,20),(57,18,26),(58,18,27),(59,18,3),(60,18,28),
(61,19,28),
(62,20,16),(63,20,20),(64,20,5),(65,20,22),(66,20,29),(67,20,30),(68,20,1),(69,20,2),
(70,21,9),
(71,22,10),(72,22,31),(73,22,32),
(74,23,14),
(75,24,14),(76,24,33),(77,24,34);