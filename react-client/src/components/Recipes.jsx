import React from 'react';
import RecipeList from './RecipeList.jsx';

class Recipes extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    // console.log(`Most recipes:    `, this.props.recipes.most);
    return (
      <div className="recipes-container">
        <div className="all"> ALL
          <RecipeList selected={this.props.selected}
                       recipes={this.props.recipes.all}
                  toggleRecipe={this.props.toggleRecipe}
                      listName="all" />
        </div>
        <div className="most"> MOST
          <RecipeList  selected={this.props.selected}
                        recipes={this.props.recipes.most}
                   toggleRecipe={this.props.toggleRecipe}
                       listName="most" />
        </div>
        <div className="some"> SOME
          <RecipeList  selected={this.props.selected}
                        recipes={this.props.recipes.some}
                   toggleRecipe={this.props.toggleRecipe}
                       listName="some" />
        </div>
      </div>)
  }
}

export default Recipes;