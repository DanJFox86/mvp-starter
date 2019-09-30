import React from 'react';
import Recipe from './Recipe.jsx';

class RecipeList extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    console.log(this.props.recipes);

    let recipes = this.props.recipes.map((recipe) => (
      <Recipe recipe={recipe} />
    ));

    return (
      <div className="recipeList">
        {recipes}
      </div>

    );
  }
}

export default RecipeList;