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
    console.log(this.props.recipeInfo)
    let allRecipes = this.filterRecipes('all');
    let mostRecipes = this.filterRecipes('most');
    let someRecipes = this.filterRecipes('some');
    return (
      <div className="recipes-container">
        <div className="all">
          <div className="header"> ALL</div>
          <RecipeList selected={this.props.selected}
                       recipes={allRecipes}
                  toggleRecipe={this.props.toggleRecipe}
                      listName="all" />
        </div>
        <div className="most">
          <div className="header"> MOST</div>
          <RecipeList  selected={this.props.selected}
                        recipes={mostRecipes}
                   toggleRecipe={this.props.toggleRecipe}
                       listName="most" />
        </div>
        <div className="some">
          <div className="header"> SOME</div>
          <RecipeList  selected={this.props.selected}
                        recipes={someRecipes}
                   toggleRecipe={this.props.toggleRecipe}
                       listName="some" />
        </div>
      </div>)
  }
}

export default Recipes;