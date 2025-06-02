import React from 'react';
import './StockForm.css';

function StockForm() {
  return (
    <div className="dashboard">
      <h1>Finance Dashboard</h1>
      <form className="stock-form">
        <input type="text" placeholder="Stock Symbol" />
        <input type="number" placeholder="Quantity" />
        <input type="number" placeholder="Purchase Price" />
        <button type="submit">Add Stock</button>
      </form>
      <h2>Stock List</h2>
      <p>No stocks added yet.</p>
    </div>
  );
}

export default StockForm;
