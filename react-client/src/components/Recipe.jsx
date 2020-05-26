import React from 'react';

class Recipe extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    const { ingredients, recipe, toggleRecipe } = this.props;
    const { id, name, isSelected } = recipe;

    const ingredientList = recipe.ingredients.map((ingredientId) => {
      const className = `ingredient${ingredients.selected[ingredientId] !== undefined ? '-present' : ''}`;
      return (<div className={className}
              data-recipe_id={id}
                     onClick={toggleRecipe}>- {ingredients.all[ingredientId]}</div>);
    });

    const recipeClassName = `recipe${isSelected ? ' selected' : ''}`;
    // console.log(`recipe id #${id} is ${isSelected ? 'selected' : 'not selected'}`)
    // console.log(`Creating recipe DOM object for:       `, this.props.recipe);
    return (
      <div className={recipeClassName}
      data-recipe_id={id}
             onClick={toggleRecipe}>
        <div className="recipe-top"
        data-recipe_id={id}>
          <div className="recipe-name"
          data-recipe_id={id}>
            <b data-recipe_id={id}>{name}</b>
          </div>
          {/* {button} */}
        </div>
        <div className="recipe-ingredients"
        data-recipe_id={id}>
          {ingredientList}
        </div>
      </div>
    );
  }
}

export default Recipe;