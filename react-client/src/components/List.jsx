import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div className="ingredient-list">
    <h4 className="ingListHeader" key={Math.floor(Math.random() * 10000)}>What Ingredients do you have in your kitchen?</h4>
    <select multiple onChange={props.onItemChange} className={`Multi${props.listName}`} name={`Multi${props.listName}`}>
      { props.items.map(item => <ListItem item={item}/>)}
    </select>
  </div>
)

export default List;