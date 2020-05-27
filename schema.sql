DROP DATABASE IF EXISTS refrigeratorducer;

CREATE DATABASE refrigeratorducer;

USE refrigeratorducer;

DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
  id tinyint NOT NULL,
  name varchar(200) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS food;

CREATE TABLE food (
  id tinyint NOT NULL,
  data_type varchar(50) NOT NULL,
  description varchar(200) NOT NULL,
  publication_date varchar(11) NOT NULL,
  food_category_id varchar(20) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'recipeDietaryJoin'
--
-- ---

DROP TABLE IF EXISTS recipeDietaryJoin;

CREATE TABLE recipeDietaryJoin (
  id tinyint NOT NULL,
  recipe_id tinyint NOT NULL,
  dietary_id tinyint NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'dietaryReq'
--
-- ---

DROP TABLE IF EXISTS dietaryReq;

CREATE TABLE dietaryReq (
  id tinyint NOT NULL,
  name varchar(200) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'ingredients'
--
-- ---

DROP TABLE IF EXISTS ingredients;

CREATE TABLE ingredients (
  id tinyint AUTO_INCREMENT,
  name varchar(200) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'ingredientRecipeJoin'
--
-- ---

DROP TABLE IF EXISTS ingredientRecipeJoin;

CREATE TABLE ingredientRecipeJoin (
  id tinyint NOT NULL,
  recipe_id tinyint NOT NULL,
  ingredient_id tinyint NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS basics;

CREATE TABLE basics (
  id tinyint NOT NULL,
  ingredient_id tinyint NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE recipeDietaryJoin ADD FOREIGN KEY (recipe_id) REFERENCES recipes (id);
ALTER TABLE recipeDietaryJoin ADD FOREIGN KEY (dietary_id) REFERENCES dietaryReq (id);
ALTER TABLE ingredientRecipeJoin ADD FOREIGN KEY (recipe_id) REFERENCES recipes (id);
ALTER TABLE ingredientRecipeJoin ADD FOREIGN KEY (ingredient_id) REFERENCES ingredients (id);
ALTER TABLE basics ADD FOREIGN KEY (ingredient_id) REFERENCES ingredients (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `recipes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `recipeDietaryJoin` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `dietaryReq` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `ingredients` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `ingredientRecipeJoin` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

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
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
