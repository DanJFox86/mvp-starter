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
    const allList = this.filterRecipes('all');
    const mostList = this.filterRecipes('most');
    const someList = this.filterRecipes('some');
    const { ingredients, toggleRecipe } = this.props;
    return (
      <div className="recipes-container">
        <div className="all">
          <div className="header"> ALL</div>
          <RecipeList ingredients={ingredients}
                          recipes={allList}
                     toggleRecipe={toggleRecipe}
                         listName="all" />
        </div>
        <div className="most">
          <div className="header"> MOST</div>
          <RecipeList  ingredients={ingredients}
                           recipes={mostList}
                      toggleRecipe={toggleRecipe}
                          listName="most" />
        </div>
        <div className="some">
          <div className="header"> SOME</div>
          <RecipeList  ingredients={ingredients}
                           recipes={someList}
                      toggleRecipe={toggleRecipe}
                          listName="some" />
        </div>
      </div>)
  }
}

export default Recipes;