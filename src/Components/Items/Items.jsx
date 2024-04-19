// Items.js
import React from 'react';

function Items({ items }) {
  return (
    <div className="Items">
    <h2>Items</h2>
    <ul>
      {items.map(item => ( 
        <li key={item.id}>
          {item.id}. {item.name}: {item.description}
        </li>
      ))}
    </ul>
    
    
  </div>
  );
}

export default Items;
