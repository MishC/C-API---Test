// AddItem.js
import React, { useState } from 'react';
import axios from 'axios';
import "./AddItem.css";

function AddItem({ fetchItems, items }) {
  const [Id, setId] = useState(0);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [isClicked,setIsClicked]= useState("");
  const [idUsed, setIdUsed] = useState(false);

/*functions*/
  const changeId = (event) => {
    const value=event.target.value;
     const idInItems=items.some(item=>item.id==value);
     setIdUsed(idInItems);
    if (/^[0-9]*[1-9][0-9]*$/.test(value) ) {
      setId(value);
    }
  };

  const changeDescription = (event) => {
    setDescription(event.target.value);
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  const handleAddItem = async () => {
    try {
      if (!idUsed) {
      const response = await axios.post("http://localhost:5211/Item", {
        id: Id, name: name, description: description
      });
      console.log("Data sent successfully:", response.data);
      fetchItems();

    setId(0);
    setName("");
    setDescription("");}
    else {    fetchItems();
    }
    } catch(error) {
      console.error("Error while sending data to the server:", error);
    }
  };
  const AddItemonClick=() => {
    setIsClicked(true);
    console.log(isClicked);
    };
      
/*End of functions */
  return (
    <div className="AddItem">
    <div className="buttons">
    <button className="button-13" onClick={AddItemonClick} role="button">Add Item</button></div>
    {isClicked&& <div> 
<div className="addProperty">
   <div className="userId">   <label htmlFor="userId">Id:</label>
<input
  type="number"
  id="userId"
  value={Id}
  onChange={changeId}
  min={1}
/>
</div>
<div className="name">   <label htmlFor="name">Name:</label>
<input
  type="text"
  id="name"
  value={name}
  onChange={changeName}
/>
</div>
<div className="description">   <label htmlFor="description">Description:</label>
<input
  type="text"
  id="description"
  value={description}
  onChange={changeDescription}
/>
</div></div>
<div className="buttons"> 

<button className="button-13" onClick={handleAddItem} role="button">Create Item</button></div>
      </div>}
      
      {idUsed&&<div className="warning">Sorry, id is already in use.</div>}

      </div>

  );
}

export default AddItem;
