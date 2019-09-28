import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      basics: [],
      selectedBasics: [],
      selectedIngredients: []
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
      console.log(`Current selection of basics:     `, this.state.selectedBasics);
      console.log(`Current selection of ingredients:     `, this.state.selectedIngredients);
    }, 2000);
  }

  getRecipes(e) {
    let data = this.state;
    $.post({
      url: '/getRecipes',
      method: 'POST',
      data
    }, (response) => {
      console.log('whats up', response);
    })
  }

  itemChange(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(Number(options[i].value));
      }
    }
    console.log(e.target.getAttribute('class'))
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

  render () {
    return (
    <div className="container">
      <div>
        <List onItemChange={this.itemChange.bind(this)} listName="Ingredients" items={this.state.items}/>
      </div>
      <div>
        <List onItemChange={this.itemChange.bind(this)} listName="Basics" items={this.state.basics}/>
      </div>
      <div>
        <button onClick={this.getRecipes}><h1>Submit</h1></button>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));