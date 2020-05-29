const mysql = require('mysql');
const _ = require('underscore');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'refrigeratorducer'
});

let ingredients;

const selectAll = function(callback) {

  if (ingredients === undefined) {
    ingredients = {};
    ingredients.all = {};
    connection.query('SELECT * FROM ingredients', function(err, list, fields) {
      if(err) {
        callback(err, null);
      } else {
        for (let ingredient of list) {
          ingredients.all[ingredient.id] = ingredient.name;
        }
        console.log(ingredients)
        callback(null, ingredients);
      }
    });
  } else {
    callback(null, ingredients);
  }
};

selectAll((err, response) => {
  if (!err) {
    console.log('Ingredient List initialized.');
  } else {
    console.log('Ingredient list refresh failed: trying again in 5 seconds');
    setTimeout(selectAll, 5000);
  }
});

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

const addIngredient = ({ name }, callback) => {
  let cleanName = name.replace(/[^a-zA-Z ]/g, '');
  if (cleanName.length === 0 || cleanName !== name) {
    callback('Invalid ingredient name, no special characters', null);
  } else {
    connection.query(`SELECT * FROM INGREDIENTS WHERE name="${name}"`, (err, response) => {
      if (err) {
        callback('Error communicating with database', null);
      } else {
        console.log('ATTEMPTED TO PUT INGREDIENT IN DATABASE: ', response);
        if (response.length > 0) {
          console.log('ingredient already exists')
          callback('Error: ingredient already exists', null);
        } else {
          connection.query(`INSERT INTO INGREDIENTS(name) VALUES("${name}")`, (err, response) => {
            if (err) {
              console.log(err)
              callback('Could not save new ingredient to database', null);
            } else {
              const id = response.insertId;
              ingredients.all[id] = name;
              callback(null, ingredients);
            }
          });
        }
      }
    });
  }
}



module.exports = { selectAll,
                   selectBasics,
                   findRecipes,
                   addIngredient,
                   connection
};
