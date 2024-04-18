import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [items,setItems]=useState([]);
  const fetchItems=async ()=>{
    try{const response=await axios.get("http://localhost:5211/Item");
  setItems(response?.data);
  console.log(response.data);
  console.log(items);
  } 

  catch(error){console.error("Unable to connect to the backend")}; };

  useEffect(()=>{fetchItems()},[])



  return (

    <div className="App">
      <header className="App-header">
    <div>
<h2>Elements</h2>      
      <ul> {items.map(item=>(<li key={item.id}>{item.id}. {item.name}:{item.description}</li>))} </ul> 
    

    </div>
      </header>
    </div>
  );
}

export default App;
