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
      ingredients: {
        all: {},
        selected: {}
      },
      items: [],
      basics: [],
      selectedBasics: [],
      recipes: {
        list: {},
        all: [],
        most: [],
        some: []
      },
      selectedRecipes: [],
      groceryList: {}
    }
    this.getRecipes = this.getRecipes.bind(this);
    this.updateGroceries = this.updateGroceries.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/ingredients',
      success: (ingredients) => {
        this.setState({
          ingredients
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });

  }

  getRecipes() {
    let data = { ingredientIds: Object.keys(this.state.ingredients.selected) };
    $.post({
      url: '/getRecipes',
      method: 'POST',
      data,
      success: (recipes) => {
        this.setState({
          recipes,
          groceryList: {},
          selectedRecipes: []
        });
      }
    });
  }

  itemChange(e) {
    const { options } = e.target;
    let newIngredients = _.cloneDeep(this.state.ingredients);
    let newSelected = {};
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        newSelected[options[i].value] = true;
      }
    }
    newIngredients.selected = newSelected;
    this.setState({
      ingredients: newIngredients
    });
  }

  toggleRecipe(e) {
    const { recipe_id } = e.target.dataset;
    const id = Number(recipe_id);
    let newRecipes = _.cloneDeep(this.state.recipes);
    let newGroceryList = _.cloneDeep(this.state.groceryList);
    const { ingredients } = this.state;

    newRecipes.list[id].isSelected = !newRecipes.list[id].isSelected;

    this.updateGroceries(id, newRecipes, ingredients, newGroceryList);

    this.setState({
      recipes: newRecipes,
      groceryList: newGroceryList
    });
  }

  updateGroceries(id, recipes, ingredients, groceryList) {
    // go thru each recipe
    // -- if selected go thru each ingredient
    // ---- If ingredient is not in grocery list and user does not have it, add ingredient id to list
    if (recipes.list[id].isSelected) {
      for (let ingredientId of recipes.list[id].ingredients) {
        if (!ingredients.selected[ingredientId]) {
          if (!groceryList[ingredientId]) {
            groceryList[ingredientId] = 0;
          }
          groceryList[ingredientId] += 1;
        } else {
          if (groceryList[ingredientId]) {
            delete groceryList[ingredientId];
          }
        }
      }
    } else {
      for (let ingredientId of recipes.list[id].ingredients) {
        if (!ingredients.selected[ingredientId]) {
          groceryList[ingredientId] -= 1;
          if (groceryList[ingredientId] === 0) {
            delete groceryList[ingredientId];
          }
        }
      }
    }
  }

  render () {
    return (
      <div className='app-container'>
        <img className='title' src="logo.png"></img>
        <div className="container">
          <IngredientList onItemChange={this.itemChange.bind(this)}
                              listName="Ingredients"
                           ingredients={this.state.ingredients}
                            getRecipes={this.getRecipes.bind(this)}/>
          <Recipes recipes={this.state.recipes}
               ingredients={this.state.ingredients}
              toggleRecipe={this.toggleRecipe.bind(this)} />
          <GroceryList  ingredients={this.state.ingredients}
                               list={this.state.groceryList}/>
        </div>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));