import React from 'react';
import ListItem from './ListItem.jsx';

class GroceryList extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    let groceryList = this.props.list.length > 0 ? this.props.list.map((item) => (
      <ListItem item={item} />
    )) : 'No groceries yet';

    return (
      <div className="groceryList">
        <div>GROCERY LIST</div>
        {groceryList}
      </div>

    );
  }
}

export default GroceryList;