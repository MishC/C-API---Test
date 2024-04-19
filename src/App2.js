import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [items, setItems] = useState([]);
  const [Id, setId] = useState(0);
  const [description, setDescription]=useState("");
  const [name, setName]=useState("");

  const [isClicked, setIsClicked] = useState(false);
  const [idUsed, setIdUsed] = useState(false);




  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5211/Item");

      const sortedItems = [...response.data].sort((a, b) => a.id - b.id);

      console.log(response.data);
      setItems(sortedItems);
    } catch(error) {
      console.error("Unable to connect to the backend:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);


  const changeId = (event) => {
    const value=event.target.value;
     const idInItems=items.some(item=>item.id==value);
     setIdUsed(idInItems);
    if (value === 0  || /^[0-9]*[1-9][0-9]*$/.test(value) ) {
      setId(value);
    }
  };
  
  const removeId = (event) => {
    const value=event.target.value;
   
    if (value === 0  || /^[0-9]*[1-9][0-9]*$/.test(value) ) {
      setId(value);
    }
  };
  
  
  const changeDescription= (event) => {
    const value=event.target.value;
    
      setDescription(value);
    }

    const changeName= (event) => {
      const value=event.target.value;
      
        setName(value);
      }
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
      else {        fetchItems();
      }
      } catch(error) {
        console.error("Error while sending data to the server:", error);
      }
    };
     
      
  
  
  const removeButtonClick = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:5211/Item/${id}`);
      console.log("Item removed successfully:", response.data);
      fetchItems();
      setId(0);
    } catch(error) {
      console.error("Error while removing item:", error);
    }
  };

 const AddItemonClick=() => {
setIsClicked(true);
console.log(isClicked);
};
  



  return (
    <div className="App">
      <header className="App-header">      </header>

        <div>
          <h2>Items</h2>
          <ul>
            {items.map(item => ( 
              <li key={item.id}>
                {item.id}. {item.name}: {item.description}
              </li>
            ))}
          </ul>
          
          
        </div>
        
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
        <div className="buttons"> 
          <label htmlFor="userId">Remove Id:</label>
      <input
        type="number"
        id="userId"
        name="userId"
        onChange={removeId}
      />
      
      <button className="button-13 remove" onClick={() => removeButtonClick(Id)} role="button">Remove</button>
    </div>
  {idUsed&&<div className="warning">Sorry, id is already in use.</div>}

    </div>
  );
}

export default App;
