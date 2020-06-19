import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import swal from '@sweetalert/with-react';
import IngredientList from './components/IngredientList.jsx';
import Recipes from './components/Recipes.jsx';
import GroceryList from './components/GroceryList.jsx';
import AddIngModal from './components/AddIngModal.jsx';
import NavBar from './components/NavBar.jsx';
import Trie from './components/Trie.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        Trie: {},
        all: {},
        selected: {}
      },
      basics: [],
      selectedBasics: [],
      recipes: {
        list: {},
        all: [],
        most: [],
        some: []
      },
      selectedRecipes: [],
      groceryList: {},
      modal: {
        addIngredient: {
          name: '',
          possibleIngNames: []
        }
      },
      name: '',
      newIngStartsWith: []
    }
    this.getRecipes = this.getRecipes.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.updateGroceries = this.updateGroceries.bind(this);
    this.itemChange = this.itemChange.bind(this);
    this.toggleRecipe = this.toggleRecipe.bind(this);
    this.onAddIngNameChange = this.onAddIngNameChange.bind(this);
    this.updateTrie = this.updateTrie.bind(this);
    this.updateServer = this.updateServer.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/ingredients',
      success: (ingredients) => {
        ingredients.Trie = new Trie();
        for (let key in ingredients.all) {
          ingredients.Trie.insert(ingredients.all[key].slice());
        }
        this.setState({
          ingredients
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  updateTrie(ingredients) {
    let newTrie = new Trie();
    for (let key in ingredients.all) {
      newTrie.insert(ingredients.all[key].slice());
    }
    ingredients.Trie = newTrie;
  }

  updateServer(name = this.state.name) {
    const data = {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }

    }
    return fetch(`/addIngredient`, data);
  }

  onAddIngNameChange(name) {
    this.setState({ name });
  }

  addIngredient(e) {
    // let name = this.state.name;
    console.log('changing name')
    swal({
        text: 'Add Ingredient',
        button:
        {
          value: 'add',
          text: 'add',
          className: 'add add'
        },
        content: (
          <AddIngModal onAddIngNameChange={this.onAddIngNameChange.bind(this)}
                              ingredients={this.state.ingredients}
                                    modal={this.state.modal.addIngredient}/>
        )
      })
      .then(() => {
        return this.updateServer();
      })
      .then((response) => response.json())
      .then((json) => {
        const { err, message, ingredients } = json;
        if (err) {
          swal({text: err, icon: 'warning', button: 'close'});
        } else {
          this.updateTrie(ingredients);
          this.setState({ ingredients }, () => {
            swal({
              text: 'Ingredient Successfully Added',
              icon: 'success',
           buttons: {
                      close: {
                        value: 'close',
                        className: 'add close'
                      },
                      addAnother: {
                         text: 'Add Another?',
                        value: 'addAnother',
                        className: 'add another'
                      }
                    }
                  })
                .then((value) => {
                  switch(value) {
                    case 'close':
                      swal.close();
                      break;
                    case 'addAnother':
                      swal.close();
                      this.addIngredient();
                  }
                });
          });
        }
        return;
      })
      .catch((err) => {
        console.log(err)
        if (err) {
          swal("Oh noes!", "The AJAX request failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
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
    const { addIngredient, itemChange, getRecipes, toggleRecipe, updateServer } = this;
    const { ingredients, recipes, groceryList } = this.state;
    return (
      <div className='app-container'>
        <NavBar/>
        <div className="container">
          <IngredientList addIngredient={addIngredient}
                           onItemChange={itemChange}
                               listName="Ingredients"
                            ingredients={ingredients}
                             getRecipes={getRecipes}
                           updateServer={updateServer}/>
          <Recipes recipes={recipes}
               ingredients={ingredients}
              toggleRecipe={toggleRecipe} />
          <GroceryList  ingredients={ingredients}
                               list={groceryList}/>
        </div>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));