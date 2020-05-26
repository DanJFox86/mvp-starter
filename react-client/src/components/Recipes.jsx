import React from 'react';
import RecipeList from './RecipeList.jsx';

class Recipes extends React.Component {

  constructor(props) {
    super(props);
    // this.recipes = this.filterRecipes.bind(this);
  }

  filterRecipes(type) {
    return this.props.recipeInfo.recipes.filter((recipe) => {
      if (this.props.recipeInfo[type].includes(recipe.id)) {
        return true;
      }
      return false;
    });
  }
  render() {
    // console.log(`Most recipes:    `, this.props.recipes.most);
    // console.log(this.props.recipeInfo)
    let allRecipes = this.filterRecipes('all');
    let mostRecipes = this.filterRecipes('most');
    let someRecipes = this.filterRecipes('some');
    let { posIngredients, selected, toggleRecipe } = this.props;
    return (
      <div className="recipes-container">
        <div className="all">
          <div className="header"> ALL</div>
          <RecipeList posIngredients={posIngredients}
                            selected={selected}
                             recipes={allRecipes}
                        toggleRecipe={toggleRecipe}
                            listName="all" />
        </div>
        <div className="most">
          <div className="header"> MOST</div>
          <RecipeList  selected={selected}
                        recipes={mostRecipes}
                   toggleRecipe={toggleRecipe}
                       listName="most" />
        </div>
        <div className="some">
          <div className="header"> SOME</div>
          <RecipeList  selected={selected}
                        recipes={someRecipes}
                   toggleRecipe={toggleRecipe}
                       listName="some" />
        </div>
      </div>)
  }
}

export default Recipes;