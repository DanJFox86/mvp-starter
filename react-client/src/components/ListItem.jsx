import React from 'react';

const ListItem = (props) => (
  <option value={props.item.id} key={props.item.id}>
    { props.item.name }
  </option>
)

export default ListItem;