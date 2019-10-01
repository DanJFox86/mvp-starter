import React from 'react';
import ListItem from './ListItem.jsx';

class GroceryList extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    console.log(this.props.list.length)
    let groceryList = this.props.list.length > 0 ? this.props.list.reduce((acc, item) => {
      acc.push(` - ${item.name}`);
      return acc;
    }, []) : 'No groceries yet';

    return (
      <div className="groceryList">
        <div>GROCERY LIST</div>
        <textarea rows={Math.min(20, groceryList.length)} value={typeof groceryList === 'object' ? groceryList.join('\n') : groceryList}>
        </textarea>
      </div>
    );
  }
}

export default GroceryList;