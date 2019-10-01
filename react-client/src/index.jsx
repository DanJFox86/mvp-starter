import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
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
        all: [],
        most: [],
        some: []
      },
      selectedRecipes: [],
      groceryList: []
    }
    this.getRecipes = this.getRecipes.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
    $.ajax({
      url: '/basics',
      success: (data) => {
        this.setState({
          basics: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
    // setInterval(() => {
    //   // console.log(`Current possible recipes:     `, this.state.possibleRecipes);
    //   console.log(`Current grocery list:     `, this.state.groceryList);
    // }, 2000);
  }

  getRecipes(e) {
    let data = { ingList: this.state.selectedIngredients };
    $.post({
      url: '/getRecipes',
      method: 'POST',
      data,
      success: (possibleRecipes) => {
        let groceryList = [];
        let ingredientNames = this.state.selectedIngredients.map((ingredient) => {
          return ingredient.name;
        });
        possibleRecipes.most.forEach((recipe) => {
          recipe.isSelected = false;
        });
        possibleRecipes.some.forEach((recipe) => {
          recipe.isSelected = false;
        });
        // console.log(ingredientNames);
        // possibleRecipes.most.forEach((recipe) => {
        //   recipe.ingredients.forEach((ingredient) => {
        //     if (!ingredientNames.includes(ingredient.name) && !groceryNames.includes(ingredient.name)) {
        //       groceryNames.push(ingredient.name);
        //       groceryList.push(ingredient);
        //       console.log(`Added ${ingredient.name} to grocery list`);
        //     }
        //   });
        // });
        // possibleRecipes.some.forEach((recipe) => {
        //   recipe.ingredients.forEach((ingredient) => {
        //     if (!ingredientNames.includes(ingredient.name) && !groceryNames.includes(ingredient.name)) {
        //       groceryNames.push(ingredient.name);
        //       groceryList.push(ingredient);
        //       console.log(`Added ${ingredient.name} to grocery list`);
        //     }
        //   });
        // });
        // console.log(groceryList);
        this.setState({
          possibleRecipes,
          groceryList: [],
          selectedRecipes: []
        });
      }
    });
  }

  itemChange(e) {
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
    let { selectedRecipes } = this.state;
    // console.log(`Current Recipe ID:     `, e.target.getAttribute('id'));
    let currentRecipe = { ingredients: [] };
    let currentPossibleRecipes = JSON.parse(JSON.stringify(this.state.possibleRecipes));
    currentPossibleRecipes.most.forEach((recipe) => {
      // console.log(recipe.recipe_id);
      if (recipe.recipe_id === Number(e.target.getAttribute('id'))) {
        recipe.isSelected = !recipe.isSelected;
        currentRecipe = recipe;
      }
    });
    currentPossibleRecipes.some.forEach((recipe) => {
      // console.log(recipe.recipe_id);
      if (recipe.recipe_id === Number(e.target.getAttribute('id'))) {
        recipe.isSelected = !recipe.isSelected;
        currentRecipe = recipe;
      }
    });
    let selectedRecipeIds = [];
    let selectedIngredientNames = [];
    this.state.selectedIngredients.forEach((ingredient) => {
      selectedIngredientNames.push(ingredient.name);
    })
    this.state.selectedRecipes.forEach((recipe) => {
      selectedRecipeIds.push(recipe.recipe_id);
    });
    // console.log(currentRecipe);
    let currentSelectedRecipes = this.state.selectedRecipes;
    if (!selectedRecipeIds.includes(currentRecipe.recipe_id)) {
      currentSelectedRecipes.push(currentRecipe);
    } else {
      currentSelectedRecipes.splice(selectedRecipeIds.indexOf(currentRecipe.recipe_id), 1);
    }
    console.log(`Currently selected recipes:      `, currentSelectedRecipes);
    let groceryList = [];
    let groceryNames = [];
    if (currentSelectedRecipes.length > 0) {
      currentSelectedRecipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          if (!groceryNames.includes(ingredient.name) && !selectedIngredientNames.includes(ingredient.name)) {
            groceryNames.push(ingredient.name);
            groceryList.push(ingredient);
          }
        })
      });
    }
    this.setState({
      possibleRecipes: currentPossibleRecipes,
      selectedRecipes: currentSelectedRecipes,
      groceryList
    });
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
      <div>
        <img src="logo.png"></img>
        <div className="container">
          <div>
            <List onItemChange={this.itemChange.bind(this)}
                      listName="Ingredients"
                        items={this.state.items}/>
          </div>
          {/* <div>
            <List onItemChange={this.itemChange.bind(this)}
                      listName="Basics"
                        items={this.state.basics}/>
          </div> */}
          <div>
            <button className="get-recipe-button" onClick={this.getRecipes}><h1>Find Recipes!   -></h1></button>
          </div>
          <div className="recipeLists">
            <Recipes recipes={this.state.possibleRecipes}
                    selected={selectedIngredients}
                toggleRecipe={this.toggleRecipe.bind(this)} />
          </div>
          <div>
            <GroceryList onGroceryChange={this.onGroceryChange.bind(this)} list={this.state.groceryList}/>
          </div>
        </div>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));