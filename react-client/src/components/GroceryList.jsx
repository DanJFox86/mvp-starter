import React from 'react';
import Recipe from './Recipe.jsx';

class GroceryList extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    console.log(this.props.recipes);

    let recipes = this.props.recipes.length > 0 ? this.props.recipes.map((recipe) => (
      <ListItem recipe={recipe} />
    )) : 'No recipes available';

    return (
      <div className="groceryList">
        {recipes}
      </div>

    );
  }
}

export default GroceryList;