import React from 'react';
import Recipe from './Recipe.jsx';

class RecipeList extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    // console.log(this.props.recipes);

    let recipes = this.props.recipes.length > 0 ? this.props.recipes.map((recipe) => (
      <Recipe selected={this.props.selected}
                recipe={recipe}
          toggleRecipe={this.props.toggleRecipe}
              listName={this.props.listName} />
    )) : 'No recipes available';

    return (
      <div className="recipeList">
        {recipes}
      </div>

    );
  }
}

export default RecipeList;