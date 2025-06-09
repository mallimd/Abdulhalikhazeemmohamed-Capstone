// src/components/StockForm.jsx
import React, { useState, useContext } from "react";
import { StockContext } from "../context/StockContext";
import "./StockForm.css";

const API_KEY = "RXKZ8ZG872AEKKUZ"; // Replace with your real key
const API_URL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo";

const StockForm = () => {
  const { stocks, setStocks } = useContext(StockContext);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate symbol using API
    try {
      const response = await fetch(`${API_URL}${symbol}&apikey=${API_KEY}`);
      const data = await response.json();
      const quote = data["Global Quote"];

      if (!quote || !quote["05. price"]) {
        console.warn("Invalid stock symbol");
        return;
      }

      const newStock = {
        symbol: symbol.toUpperCase(),
        quantity: parseFloat(quantity),
        purchasePrice: parseFloat(price),
        currentPrice: null, // will be updated later
        profitLoss: null,
      };

      setStocks([...stocks, newStock]);

      // Reset form
      setSymbol("");
      setQuantity("");
      setPrice("");
    } catch (err) {
      console.error("API call failed:", err);
    }
  };

  return (
    <div className="dashboard">
      <h1>Finance Dashboard</h1>
      <form className="stock-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Purchase Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Stock</button>
      </form>
    </div>
  );
};

export default StockForm;
