import React from 'react';
import ListItem from './ListItem.jsx';

class GroceryList extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    let { list, ingredients } = this.props;
    let groceryList = 'No groceries yet';
    for (let id in list) {
      if (typeof groceryList === 'string') {
        groceryList = [];
      }
      groceryList.push(ingredients.all[id]);
    }
    if (typeof groceryList === 'object') {
      groceryList = groceryList.join('\n');
    }

    return (
      <div className="groceryList">
        <div>GROCERY LIST</div>
        <textarea rows={Math.max(20, Object.keys(list).length)} value={groceryList}>
        </textarea>
      </div>
    );
  }
}

export default GroceryList;