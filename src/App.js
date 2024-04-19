// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Items from "./Components/Items/Items";
import AddItem from "./Components/AddItem/AddItem";
import RemoveItem from "./Components/RemoveItem/RemoveItem";

function App() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5211/Item");
      const sortedItems = [...response.data].sort((a, b) => a.id - b.id);
      setItems(sortedItems);
    } catch (error) {
      console.error("Unable to connect to the backend:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* Header content */}
      </header>

      <Items items={items} />
      <AddItem fetchItems={fetchItems} items={items} />
      <RemoveItem fetchItems={fetchItems}   />
    </div>
  );
}

export default App;
