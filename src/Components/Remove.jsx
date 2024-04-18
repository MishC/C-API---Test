import React, { useState } from 'react';
import axios from 'axios';
import "./Remove.css";
 
export default function Remove(props) {
 
  const removeButtonClick = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5211/Item/${id}`);
      console.log("Item removed successfully:", response.data);
    } catch(error) {
      console.error("Error while removing item:", error);
    }
  };

  return (
    <div>
      
      <button className="button-13" onClick={() => removeButtonClick(props.id)} role="button">Remove</button>

    </div>
  );
}

