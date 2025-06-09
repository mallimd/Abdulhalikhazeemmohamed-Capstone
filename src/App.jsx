import React from "react";
import StockForm from "./components/StockForm";
import StockList from "./components/StockList";
import "./components/StockForm.css"; // make sure this is imported

function App() {
  return (
    <div className="dashboard">
      {/* Keep just one heading */}
      <h1>Finance Dashboard</h1>
      <StockForm />
      <StockList />
    </div>
  );
}


export default App;
