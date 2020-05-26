import React from 'react';

const ListItem = (props) => {
  const { id, name } = props;
  return (
    <option value={id} key={id}>
      { name }
    </option>
  );
}

export default ListItem;