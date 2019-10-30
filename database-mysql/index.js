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
    ingQuery.push(`ingredient_id = ${Number(ing.id)}`);
  });
  // console.log(`Names of selected ingredients:     `, ingNameQuery);

  let query = `SELECT recipe_id FROM ingredientRecipeJoin WHERE ${ingQuery.join(' OR ')}`;
  // console.log(query);
  connection.query(query, (err, results, fields) => { // Gets list of recipes IDs that have at least 1 of the selected ingredients
    if(err) {
      callback(err, null);
    } else {
      let resultIds = results.map((result) => {
        return result.recipe_id;
      });
      resultIds = _.uniq(resultIds);
      let recipeIdQuery = [];
      resultIds.forEach((id) => {
        recipeIdQuery.push(`ID=${id}`);
      });
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
            .then((recipeInfo) => {
              recipeInfoSort(recipeInfo, ingList, callback);
            });
        }
      });
    }
  });
};

const recipeInfoSort = (recipeInfo, ingList, callback) => {
  // console.log(recipeInfo);
  let sortedRecipes = {
    all: [],
    most: [],
    some: []
  };
  let ingredientNames = ingList.map((ing) => {
    return ing.name;
  });
  // console.log(ingredientNames);
  recipeInfo.forEach((recipe) => {
    let ingTotal = recipe.ingredients.length;
    let ingHaz = 0;
    recipe.ingredients.forEach((ing) => {
      // console.log(ing);
      if (ingredientNames.includes(ing.name)) {
        ingHaz++;
      }
    });
    let haveIngPercentage = ingHaz / ingTotal;
    // console.log(haveIngPercentage)
    if (haveIngPercentage === 1) {
      sortedRecipes.all.push(recipe);
    } else if (haveIngPercentage >= .5) {
      recipe.haveIngPercentage = haveIngPercentage;
      sortedRecipes.most.push(recipe);
    } else {
      sortedRecipes.some.push(recipe);
    }
  });
  sortedRecipes.most.sort((a, b) => {
    return b.haveIngPercentage - a.haveIngPercentage;
  });
  sortedRecipes.some.sort((a, b) => {
    return b.haveIngPercentage - a.haveIngPercentage;
  });
  // console.log(sortedRecipes);
  callback(null, sortedRecipes);
}



module.exports = { selectAll,
                   selectBasics,
                   findRecipes,
                   connection
};
