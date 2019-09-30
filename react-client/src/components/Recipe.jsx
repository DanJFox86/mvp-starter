import React from 'react';

class Recipe extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    let { recipe_name, ingredients } = this.props.recipe;
    console.log(`Creating recipe DOM object for:       `, this.props.recipe);
    return (
      <div className="recipe">
        <div className="recipe-name">
          {recipe_name}
        </div>
        <div className="recipe-ingredients">
          {JSON.stringify(ingredients)}
        </div>
      </div>
    );
  }
}

export default Recipe;