// RemoveItem.js
import React, { useState } from 'react';
import axios from 'axios';

function RemoveItem({ fetchItems }) {
  const [Id, setId] = useState(0);
  const [fail, setFail] = useState(false);

  const removeId = (event) => {
    const value=event.target.value;
   
    setId(value);
    setFail(false);


  };

  const removeButtonClick = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5211/Item/${id}`);
      console.log("Item removed successfully:", response.data);
      fetchItems();
      setFail(false);

      setId(0);
    } catch (error) {
      console.error("Error while removing item:", error);
      fetchItems();

      setFail(true);



    }
  };

  return (
    <div className="removeItem">
      <div className="buttons"> 
          <label htmlFor="removeItem">Remove Id:</label>
      <input
        type="number"
        id="remove"
        name="remove"
        onChange={removeId}
        min="1"

      />
      <button className="button-13 remove" onClick={() => removeButtonClick(Id)} role="button">Remove</button>
    </div>
    {fail&&<div className="warning">Unable to remove item with id {Id}. No such item.</div>}
    </div>
  );
}

export default RemoveItem;
