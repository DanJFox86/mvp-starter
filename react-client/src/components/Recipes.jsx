import React from 'react';
import RecipeList from './RecipeList.jsx';

class Recipes extends React.Component {

  constructor(props) {
    super(props);
    // this.recipes = this.filterRecipes.bind(this);
  }

  filterRecipes(type) {
    return this.props.recipes[type].map((id) => {
      return this.props.recipes.list[Number(id)];
    });
  }
  render() {
    let allRecipes = this.filterRecipes('all');
    let mostRecipes = this.filterRecipes('most');
    let someRecipes = this.filterRecipes('some');
    let { ingredients, toggleRecipe } = this.props;
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