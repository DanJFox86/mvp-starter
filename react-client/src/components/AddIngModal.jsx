import React from 'react';

const AddIngModal = ({ name, onNewIngChange }) => (
  <input
            onChange={onNewIngChange}
                rows="1"
                cols="50"
                value={name}
                  key={1}>
  </input>
);

export default AddIngModal;