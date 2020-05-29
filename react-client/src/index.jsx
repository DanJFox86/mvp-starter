import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import swal from '@sweetalert/with-react'
import IngredientList from './components/IngredientList.jsx';
import Recipes from './components/Recipes.jsx';
import GroceryList from './components/GroceryList.jsx';
import AddIngModal from './components/AddIngModal.jsx';
// import Trie from './components/Trie.js';

var Trie = function() {
  this.storage = {};
};

Trie.prototype.insert = function(word) {
  if (word === '') return;
  let node = this.storage;
  while (word.length) {
      if (!node[word[0]]) node[word[0]] = {};
      node = node[word[0]];
      word = word.slice(1);
  }
  node['end'] = true;
};

Trie.prototype.search = function(word) {
  if (word === '') return true;
  let node = this.storage;
  while (word.length) {
      if (!node[word[0]]) {
          return false;
      }
      node = node[word[0]];
      word = word.slice(1);
  }
  return node['end'] ? true : false;
};

Trie.prototype.startsWith = function(prefix) {
  if (prefix === '') return true;
  let node = this.storage;
  while (prefix.length) {
      if (!node[prefix[0]]) {
          return false;
      }
      node = node[prefix[0]];
      prefix = prefix.slice(1);
  }
  return true;
};

Trie.prototype.allStartsWith = function(prefix) {
  if (prefix === '') return [];
  let node = this.storage;
  let result = [];

  let helper = (node, str) => {
    if (node['end']) {
      result.push(prefix + str);
    }
    for (let key in node) {
      helper(node[key], str + key)
    }
  }

  if (this.startsWith(prefix)) {
    let myPrefix = prefix;
    while (myPrefix.length > 0) {
      node = node[myPrefix[0]];
      myPrefix = myPrefix.slice(1);
    }
    helper(node, '');
  }
  return result;
};



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
    this.onNewIngChange = this.onNewIngChange.bind(this);
    this.updateGroceries = this.updateGroceries.bind(this);
    this.itemChange = this.itemChange.bind(this);
    this.toggleRecipe = this.toggleRecipe.bind(this);
    this.onAddIngNameChange = this.onAddIngNameChange.bind(this);
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

  updateServer() {
    const { name } = this.state;
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

  onNewIngChange(e) {
  //   const { modal, ingredients } = this.state;
  //   console.log('OLD:  ', this.state.name);
  //   // let newModal = _.cloneDeep(this.state.modal);
  //   // // console.log(e.target.value)
  //   // this.state.name = e.target.value;
  //   console.log('NEW:  ', e.target.value);
  //   // console.log()
  //   // console.log(ingredients.Trie.allStartsWith(e.target.value));
  //   let newIngStartsWith = [];
  //   if (ingredients.Trie.startsWith(e.target.value.slice())) {
  //     newIngStartsWith = ingredients.Trie.allStartsWith(e.target.value.slice());
  //   }
  //   console.log(newIngStartsWith);

  //   this.setState({ name: e.target.value, newIngStartsWith  });
  }

  onAddIngNameChange(name, callback) {
    // let newModal = _.cloneDeep(this.state.modal.addIngredient);
    // console.log(newModal)
    // newModal.name = name;
    // this.setState({ modal: newModal });
    this.setState({ name }, callback);
  }

  addIngredient(e) {
    // let name = this.state.name;
    console.log('changing name')
    swal({
        text: 'Add Ingredient',
        button: 'Add',
        content: (
          <AddIngModal onAddIngNameChange={this.onAddIngNameChange.bind(this)}
                              ingredients={this.state.ingredients}
                                    modal={this.state.modal.addIngredient}
                                     name={this.state.name}/>
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
          this.setState({ ingredients }, () => {
            swal({
              text: 'Ingredient Successfully Added',
              icon: 'success',
           buttons: {
                      close: 'close',
                 addAnother: {
                               text: 'Add Another?',
                              value: 'addAnother'
                             }
                    }
                  })
                .then((value) => {
                  switch(value) {
                    case 'close':
                      swal.close();
                      break;
                    case 'addAnother':
                      setTimeout(() => {
                        this.addIngredient();
                      }, 0)
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
    const { addIngredient, itemChange, getRecipes, toggleRecipe } = this;
    const { ingredients, recipes, groceryList } = this.state;
    return (
      <div className='app-container'>
        <img className='title' src="logo.png"></img>
        <div className="container">
          <IngredientList addIngredient={addIngredient}
                           onItemChange={itemChange}
                               listName="Ingredients"
                            ingredients={ingredients}
                             getRecipes={getRecipes}/>
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