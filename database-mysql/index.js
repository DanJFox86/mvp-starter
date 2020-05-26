const mysql = require('mysql');
const _ = require('underscore');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'refrigeratorducer'
});

const selectAll = function(callback) {
  connection.query('SELECT * FROM ingredients', function(err, ingredients, fields) {
    if(err) {
      callback(err, null);
    } else {
      let data = {};
      for (let ingredient of ingredients) {
        data[ingredient.id] = ingredient.name;
      }
      callback(null, data);
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
  // Firstly, find recipes that can be solely made from the ingredients that have been selected
  // If no recipes exist that consist solely of the selected ingredients, find recipes that have the fewest additional ingredients necessary, prioritizing basic ingredients first
  let query = `SELECT ingredientRecipeJoin.recipe_id, ingredientRecipeJoin.ingredient_id, recipes.name FROM ingredientRecipeJoin, recipes WHERE ingredient_id IN (${ingList.join(',')}) AND ingredientRecipeJoin.recipe_id = recipes.id`;
  // console.log(query);
  connection.query(query, (err, results, fields) => {
    // Gets list of recipes IDs that have at least 1 of the selected ingredients
    if(err) {
      console.log(err)
      callback(err, null);
    } else {
      let recipeTracker = {};
      results.forEach(({ recipe_id, ingredient_id, name }) => {
        if (recipeTracker[recipe_id] === undefined) {
          recipeTracker[recipe_id] = {id: recipe_id, name , ingredients: [], isSelected: false };
        }
      });

      let promises = [];
      for (let key in recipeTracker) {
        promises.push(new Promise((resolve, reject) => {
          connection.query(`SELECT ingredients.name, ingredients.id FROM ingredients, ingredientRecipeJoin WHERE ingredientRecipeJoin.recipe_id = ${key} AND ingredients.id = ingredientRecipeJoin.ingredient_id;`, (err, ingredients) => {
            if (!err) {
              recipeTracker[key].ingredients = ingredients.map((ing) => ing.id);
              resolve();
            }
          });
        }));
      }
      Promise.all(promises)
        .then(() => {
          recipeInfoSort(recipeTracker, ingList, callback);
        });
    }
  });
};

const recipeInfoSort = (recipeTracker, ingList, callback) => {
  let list = {};
  for (let id in recipeTracker) {
    list[id] = recipeTracker[id];
  }
  let sortedRecipes = {
    list,
    all: [],
    most: [],
    some: []
  };
  let ingredientIds = ingList.map((selectedIng) => Number(selectedIng));
  for (let id in list) {
    let ingTotal = list[id].ingredients.length;
    let haveIngredient = 0;
    list[id].ingredients.forEach((ing) => {
      if (ingredientIds.includes(ing)) {
        haveIngredient++;
      }
    });
    let haveIngPercentage = haveIngredient / ingTotal;
    if (haveIngPercentage === 1) {
      sortedRecipes.all.push(Number(id));
    } else if (haveIngPercentage >= .5) {
      sortedRecipes.most.push(Number(id));
    } else {
      sortedRecipes.some.push(Number(id));
    }
  }
  sortedRecipes.most.sort((a, b) => {
    return b.haveIngPercentage - a.haveIngPercentage;
  });
  sortedRecipes.some.sort((a, b) => {
    return b.haveIngPercentage - a.haveIngPercentage;
  });
  callback(null, sortedRecipes);
}



module.exports = { selectAll,
                   selectBasics,
                   findRecipes,
                   connection
};
