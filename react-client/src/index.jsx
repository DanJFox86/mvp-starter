import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import IngredientList from './components/IngredientList.jsx';
import Recipes from './components/Recipes.jsx';
import GroceryList from './components/GroceryList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      basics: [],
      selectedBasics: [],
      selectedIngredients: [],
      possibleRecipes: {
        recipes: [],
        all: [],
        most: [],
        some: []
      },
      selectedRecipes: [],
      groceryList: []
    }
    this.getRecipes = this.getRecipes.bind(this);
    this.updateGroceries = this.updateGroceries.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (items) => {
        this.setState({
          items
        });
        // $.ajax({
        //   url: '/basics',
        //   success: (basics) => {
        //   },
        //   error: (err) => {
        //     console.log('err', err);
        //   }
        // });
      },
      error: (err) => {
        console.log('err', err);
      }
    });

  }

  getRecipes() {
    let data = { ingList: this.state.selectedIngredients };
    $.post({
      url: '/getRecipes',
      method: 'POST',
      data,
      success: (possibleRecipes) => {
        console.log('SUCCESS, got recipe info back')
        console.log(possibleRecipes)
        let groceryList = [];
        let ingredientNames = this.state.selectedIngredients.map((ingredient) => {
          return ingredient.name;
        });
        for (let recipe of possibleRecipes.recipes) {

          recipe.isSelected = false;
          // console.log(`recipe id #${recipe.id} is not selected`)
        }
        this.setState({
          possibleRecipes,
          groceryList: [],
          selectedRecipes: []
        });
      }
    });
  }

  itemChange(e) {
    console.log('CHANGING ITEMS')
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push({ id: Number(options[i].value),
                            name: options[i].text
                          });
      }
    }
    if (e.target.getAttribute('class') === 'MultiBasics'){
      // console.log('changing selection for MultiBasics');
      this.setState({
        selectedBasics: value
      });
    } else if (e.target.getAttribute('class') === 'MultiIngredients'){
      // console.log('changing selection for MultiBasics');
      this.setState({
        selectedIngredients: value
      });
    }
  }

  toggleRecipe(e) {
    let { recipe_id } = e.target.dataset;
    recipe_id = Number(recipe_id);
    let newPossibleRecipes = _.cloneDeep(this.state.possibleRecipes);
    for (let recipe of newPossibleRecipes.recipes) {
      if (recipe.id === recipe_id) {
        recipe.isSelected = !recipe.isSelected;
        break;
      }
    }
    let groceryList = this.updateGroceries();
    this.setState({
      possibleRecipes: newPossibleRecipes
    });
  }

  updateGroceries() {
    // go thru each recipe
    // -- if selected go thru each ingredient
    // ---- If ingredient is not in grocery list, add ingredient id to list
  }

  onGroceryChange(e) {
    // var options = e.target.options;
    // var value = [];
    // for (var i = 0, l = options.length; i < l; i++) {
    //   if (options[i].selected) {
    //     value.push({ id: Number(options[i].value),
    //                         name: options[i].text
    //                       });
    //   }
    // }
    // if (e.target.getAttribute('class') === 'MultiBasics'){
    //   // console.log('changing selection for MultiBasics');
    //   this.setState({
    //     selectedBasics: value
    //   });
    // } else if (e.target.getAttribute('class') === 'MultiIngredients'){
    //   // console.log('changing selection for MultiBasics');
    //   this.setState({
    //     selectedIngredients: value
    //   });
    // }
  }

  render () {
    let selectedIngredients = this.state.selectedIngredients.map((ingredient) => {
      return ingredient.name;
    });
    return (
      <div className='app-container'>
        <img className='title' src="logo.png"></img>
        <div className="container">
          <IngredientList onItemChange={this.itemChange.bind(this)}
                              listName="Ingredients"
                                 items={this.state.items}
                            getRecipes={this.getRecipes.bind(this)}/>
          <Recipes recipeInfo={this.state.possibleRecipes}
                  selected={selectedIngredients}
              toggleRecipe={this.toggleRecipe.bind(this)} />
          <GroceryList onGroceryChange={this.onGroceryChange.bind(this)} list={this.state.groceryList}/>
        </div>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));