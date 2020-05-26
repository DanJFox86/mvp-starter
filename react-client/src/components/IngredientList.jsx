import React from 'react';
import ListItem from './ListItem.jsx';

const IngredientList = (props) => {

  const { ingredients, addIngredient, listName, onItemChange, getRecipes } = props;
  let ingredientOptions = [];

  for (let id in ingredients.all) {
    ingredientOptions.push((<ListItem id={id} name={ingredients.all[id]}/>))
  }

  return (
    <div className="ingredient-list">
      <h4 className="ingListHeader" key={Math.floor(Math.random() * 10000)}>What Ingredients do you have in your kitchen?</h4>
      <select multiple onChange={onItemChange} className={`Multi${listName}`} name={`Multi${listName}`}>
        {ingredientOptions}
      </select>
      <button className="get-recipe-button" onClick={getRecipes}><h1>Find Recipes!</h1></button>
      <button className="add-ingredient-button" onClick={addIngredient}><h1>Add Ingredient</h1></button>
    </div>
  );
}

export default IngredientList;