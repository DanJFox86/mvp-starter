import React from 'react';
import Recipe from './Recipe.jsx';

class RecipeList extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    // console.log(this.props.recipes);
    let { ingredients, toggleRecipe, listName, recipes } = this.props;
    let recipeList = 'No recipes available';
    if (recipes.length > 0) {
      recipeList = recipes.map((recipe) => {
        return (
          <Recipe ingredients={ingredients}
                       recipe={recipe}
                 toggleRecipe={toggleRecipe}
                     listName={listName} />
        );
      });
    }

    return (
      <div className="recipeList">
        {recipeList}
      </div>

    );
  }
}

export default RecipeList;