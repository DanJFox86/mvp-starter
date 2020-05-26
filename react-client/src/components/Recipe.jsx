import React from 'react';

class Recipe extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    let { posIngredients } = this.props;
    let { id, name, ingredients, isSelected } = this.props.recipe;
    // let button = this.props.listName !== 'all' ? (<button className="recipe-check"
    //                                              onClick={this.props.toggleRecipe}
    //                                                   id={id}
    //                                            data-id={id}>{isSelected ? "-" : "+"}</button>) : '';
    console.log('ingredient list for ', name);
    console.log(ingredients)
    ingredients = ingredients.map((ingredient) => {
      let className = `ingredient${this.props.selected.includes(ingredient.id) ? '-present' : ''}`
      return (<div className={className}
              data-recipe_id={id}>- {ingredient.name}</div>)
    });

    let recipeClassName = `recipe${isSelected ? ' selected' : ''}`;
    // console.log(`recipe id #${id} is ${isSelected ? 'selected' : 'not selected'}`)
    // console.log(`Creating recipe DOM object for:       `, this.props.recipe);
    return (
      <div className={recipeClassName}
      data-recipe_id={id}
             onClick={this.props.toggleRecipe}>
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
          {ingredients}
        </div>
      </div>
    );
  }
}

export default Recipe;