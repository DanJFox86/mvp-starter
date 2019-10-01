import React from 'react';
import ListItem from './ListItem.jsx';

class GroceryList extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    // console.log(this.props.list);

    let groceryList = this.props.list.length > 0 ? this.props.list.map((item) => (
      <ListItem item={item} />
    )) : 'No grocery list available';

    return (
      <div className="groceryList">
        {groceryList}
      </div>

    );
  }
}

export default GroceryList;