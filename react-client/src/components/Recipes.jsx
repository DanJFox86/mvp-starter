import React from 'react';
import RecipeList from './RecipeList.jsx';

class Recipes extends React.Component {

  constructor(props) {
    super(props);
  }

  filterRecipes(type) {
    return this.props.recipes[type].map((id) => {
      return this.props.recipes.list[Number(id)];
    });
  }
  render() {
    const allRecipes = this.filterRecipes('all');
    const mostRecipes = this.filterRecipes('most');
    const someRecipes = this.filterRecipes('some');
    const { ingredients, toggleRecipe } = this.props;
    return (
      <div className="recipes-container">
        <div className="all">
          <div className="header"> ALL</div>
          <RecipeList ingredients={ingredients}
                          recipes={allRecipes}
                     toggleRecipe={toggleRecipe}
                         listName="all" />
        </div>
        <div className="most">
          <div className="header"> MOST</div>
          <RecipeList  ingredients={ingredients}
                           recipes={mostRecipes}
                      toggleRecipe={toggleRecipe}
                          listName="most" />
        </div>
        <div className="some">
          <div className="header"> SOME</div>
          <RecipeList  ingredients={ingredients}
                           recipes={someRecipes}
                      toggleRecipe={toggleRecipe}
                          listName="some" />
        </div>
      </div>)
  }
}

export default Recipes;