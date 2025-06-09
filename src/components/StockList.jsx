import React, { useContext, useEffect, useCallback } from "react";
import { StockContext } from "../context/StockContext";

const API_KEY = "RXKZ8ZG872AEKKUZ"; // Replace with your real key later
const API_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo";

const StockList = () => {
  const { stocks, setStocks } = useContext(StockContext);

  // Function to fetch stock price
  const fetchStockPrice = useCallback(async (symbol) => {
    try {
      const res = await fetch(`${API_URL}${symbol}&apikey=${API_KEY}`);
      const data = await res.json();

      const quote = data["Global Quote"];
      if (!quote || !quote["05. price"]) {
        return null; // Invalid stock
      }

      return parseFloat(quote["05. price"]);
    } catch (error) {
      console.error("API Error:", error);
      return null;
    }
  }, []);

  // Update prices for all stocks
  useEffect(() => {
    const updatePrices = async () => {
      const updatedStocks = await Promise.all(
        stocks.map(async (stock) => {
          const price = await fetchStockPrice(stock.symbol);
          if (price === null) return stock; // skip if invalid
          const profitLoss = (price - stock.purchasePrice) * stock.quantity;

          return { ...stock, currentPrice: price, profitLoss };
        })
      );
      setStocks(updatedStocks);
    };

    if (stocks.length > 0) updatePrices();
  }, [stocks.length, fetchStockPrice]);

  if (stocks.length === 0) {
    return <p>No stocks added yet.</p>;
  }

  return (
    <div>
      <h2>Stock List</h2>
      {stocks.map((stock, index) => (
        <div key={index} className="stock-post">

          <p><strong>Symbol:</strong> {stock.symbol}</p>
          <p><strong>Quantity:</strong> {stock.quantity}</p>
          <p><strong>Purchase Price:</strong> {stock.purchasePrice}</p>
          <p><strong>Current Price:</strong> {stock.currentPrice || "Loading..."}</p>
          <p style={{ color: stock.profitLoss >= 0 ? "green" : "red" }}>
            <strong>Profit/Loss:</strong> {stock.profitLoss?.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StockList;
