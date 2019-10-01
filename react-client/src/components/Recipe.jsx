import React from 'react';

class Recipe extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    let { recipe_id, recipe_name, ingredients, isSelected } = this.props.recipe;
    // console.log(`Ingredients that are on hand:     `, this.props.selected);

    ingredients = ingredients.map((ingredient) => {
      // console.log(this.props.selected.indexOf(ingredient.name) > -1);
      // console.log(ingredient.name);
      let className = `ingredient${this.props.selected.includes(ingredient.name) ? '-present' : ''}`
      return (<div className={className}>- {ingredient.name}</div>)
    });

    let recipeClassName = `recipe${isSelected ? '-selected' : ''}`;
    // console.log(`Creating recipe DOM object for:       `, this.props.recipe);
    return (
      <div className={recipeClassName}>
        <div className="recipe-top">
          <div className="recipe-name">
            <em>{recipe_name}</em>
          </div>
          <button className="recipe-check"
                    onClick={this.props.toggleRecipe}
                    id={recipe_id}>{isSelected ? "-" : "+"}</button>
        </div>
        <div className="recipe-ingredients">
          {ingredients}
        </div>
      </div>
    );
  }
}

export default Recipe;