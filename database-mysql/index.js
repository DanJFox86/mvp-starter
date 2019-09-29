var mysql = require('mysql');
const _ = require('underscore');
const Promise = require('bluebird');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'refrigeratorducer'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM ingredients', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var selectBasics = function(callback) {
  connection.query('SELECT ingredients.name, ingredients.id FROM basics, ingredients where basics.ingredient_id = ingredients.id;', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var findRecipes = (ingList, callback) => {
  console.log(ingList);
  // Firstly, find recipes that can be solely made from the ingredients that have been selected
  // If no recipes exist that consist solely of the selected ingredients, find recipes that have the fewest additional ingredients necessary, prioritizing basic ingredients first
  let ingQuery = [];
  ingList.forEach((ing) => {
    ingQuery.push(`ingredient_id = ${Number(ing)}`);
  });

  let query = `SELECT recipe_id FROM ingredientRecipeJoin WHERE ${ingQuery.join(' OR ')}`;
  // console.log(query);
  connection.query(query, (err, results, fields) => { // Gets list of recipes IDs that have at least 1 of the selected ingredients
    if(err) {
      callback(err, null);
    } else {
      let resultIds = results.map((result) => {
        return result.recipe_id;
      });
      let uniqueResults = _.uniq(resultIds);
      let recipeIdQuery = [];
      uniqueResults.forEach((id) => {
        recipeIdQuery.push(`ID=${id}`);
      });
      console.log(recipeIdQuery.join(' OR '));
      let newQuery = `SELECT * FROM recipes WHERE ${recipeIdQuery.join(' OR ')};`;
      connection.query(newQuery, (err, results) => { // Gets recipe info and sends to client
        if (err) {
          callback(err, null);
        } else {
          console.log(results);
          let list = [];
          results.forEach(({ id, name }) => {
            console.log(`finding ingredients for ${id}`);
            list.push(new Promise((resolve, reject) => {
              connection.query(`SELECT ingredients.name, ingredients.id FROM ingredients, ingredientRecipeJoin WHERE ingredientRecipeJoin.recipe_id = ${id} AND ingredients.id = ingredientRecipeJoin.ingredient_id;`, (err, results) => {
                if (!err) {
                  let obj = {
                    recipe_id: id,
                    recipe_name: name
                  };
                  obj.ingredients = results;
                  resolve(obj);
                }
              });
            }));
          });
          Promise.all(list)
            .then((sldkjsldkfj) => {
              console.log(sldkjsldkfj);
              callback(null, sldkjsldkfj);
            })
        }
      });
    }
  });
};



module.exports = { selectAll,
                   selectBasics,
                   findRecipes,
                   connection
};
