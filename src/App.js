import "./App.css";
import React, { useState } from "react";

function App() {
  const [currentPrice, setPrice] = useState([{ date: "", price: null }]);
  function callAPI() {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => response.json())
      .then((response) => {
        setPrice((arr) => [
          ...arr,
          { date: Date(), price: response.bpi.USD.rate },
        ]);
      });
  }

  function counter() {
    console.log("counter start");
    const i = 0;
    // This block will be executed 100 times.
    setInterval(function () {
      if (i === 100) clearInterval(this);
      else callAPI();
    }, 60000);
  } // End

  console.log(currentPrice);

  return (
    <div className="App">
      <header className="App-header">
        <p>bitcoin price per 1 minute</p>
        <button onClick={counter}> Start tracking price </button>

        <div>
          {currentPrice.map((object) => (
            <div>
              <p>{object.price}</p>
              <p>{object.date}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
