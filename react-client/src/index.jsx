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
    setInterval(() => {
      // console.log(`Current possible recipes:     `, this.state.possibleRecipes);
      console.log(`Current grocery list:     `, this.state.groceryList);
    }, 2000);
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
        let groceryNames = this.state.groceryList.map((ingredient) => {
          return ingredient.name;
        });
        console.log(ingredientNames);
        possibleRecipes.most.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            if (!ingredientNames.includes(ingredient.name) && !groceryNames.includes(ingredient.name)) {
              groceryNames.push(ingredient.name);
              groceryList.push(ingredient);
              console.log(`Added ${ingredient.name} to grocery list`);
            }
          });
        });
        possibleRecipes.some.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            if (!ingredientNames.includes(ingredient.name) && !groceryNames.includes(ingredient.name)) {
              groceryNames.push(ingredient.name);
              groceryList.push(ingredient);
              console.log(`Added ${ingredient.name} to grocery list`);
            }
          });
        });
        console.log(groceryList);
        this.setState({
          possibleRecipes,
          groceryList
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
            <button onClick={this.getRecipes}><h1>Find Recipes!   -></h1></button>
          </div>
          <div className="recipeLists">
            <Recipes recipes={this.state.possibleRecipes}
                    selected={selectedIngredients}/>
          </div>
          {/* <div className="groceryList">
            <GroceryList onGroceryChange={this.onGroceryChange.bind(this)} list={this.state.groceryList}/>
          </div> */}
        </div>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));