import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div className="list">
    <h4 key={Math.floor(Math.random() * 10000)}>{props.listName}</h4>
    There are { props.items.length } items.
    <select multiple onChange={props.onItemChange} className={`Multi${props.listName}`} name={`Multi${props.listName}`}>
      { props.items.map(item => <ListItem item={item}/>)}
    </select>
  </div>
)

export default List;