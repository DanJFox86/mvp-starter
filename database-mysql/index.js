const mysql = require('mysql');
const _ = require('underscore');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'refrigeratorducer'
});

const selectAll = function(callback) {
  connection.query('SELECT * FROM ingredients', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const selectBasics = function(callback) {
  connection.query('SELECT ingredients.name, ingredients.id FROM basics, ingredients where basics.ingredient_id = ingredients.id;', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const findRecipes = (ingList, callback) => {
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
          let recipes = [];
          results.forEach(({ id, name }) => {
            console.log(`finding ingredients for ${id}`);
            recipes.push(new Promise((resolve, reject) => {
              connection.query(`SELECT ingredients.name, ingredients.id FROM ingredients, ingredientRecipeJoin WHERE ingredientRecipeJoin.recipe_id = ${id} AND ingredients.id = ingredientRecipeJoin.ingredient_id;`, (err, ingredients) => {
                if (!err) {
                  let recipe = { id, name, ingredients };
                  resolve(recipe);
                }
              });
            }));
          });
          Promise.all(recipes)
            .then((recipeInfo) => {
              recipeInfoSort(recipeInfo, ingList, callback);
            });
        }
      });
    }
  });
};

const recipeInfoSort = (recipes, ingList, callback) => {
  // console.log(recipes);
  let sortedRecipes = {
    recipes,
    all: [],
    most: [],
    some: []
  };
  let ingredientNames = ingList.map((ing) => {
    return ing.name;
  });
  // console.log(ingredientNames);
  recipes.forEach((recipe) => {
    let ingTotal = recipe.ingredients.length;
    let haveIngredient = 0;
    recipe.ingredients.forEach((ing) => {
      // console.log(ing);
      if (ingredientNames.includes(ing.name)) {
        haveIngredient++;
      }
    });
    let haveIngPercentage = haveIngredient / ingTotal;
    // console.log(haveIngPercentage)
    if (haveIngPercentage === 1) {
      sortedRecipes.all.push(recipe.id);
    } else if (haveIngPercentage >= .5) {
      sortedRecipes.most.push(recipe.id);
    } else {
      sortedRecipes.some.push(recipe.id);
    }
  });
  sortedRecipes.most.sort((a, b) => {
    return b.haveIngPercentage - a.haveIngPercentage;
  });
  sortedRecipes.some.sort((a, b) => {
    return b.haveIngPercentage - a.haveIngPercentage;
  });
  console.log(sortedRecipes);

  callback(null, sortedRecipes);
}



module.exports = { selectAll,
                   selectBasics,
                   findRecipes,
                   connection
};
