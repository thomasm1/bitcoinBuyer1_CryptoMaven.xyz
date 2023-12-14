import React, { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [counter, setCounter] = useState(0);
  const [bitcoin, setBitcoin] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBitcoin(input);
  };

  return (
    <div>
      <h2>Bitcoin Price Checker</h2>
      <form onSubmit={handleSubmit}>
        <label>Increment: </label>
        <input type="text" value={counter} onChange={(e) => setCounter(e.target.value)} />
        <button type="button" onClick={increment}>Increment</button>
        <label>Enter Bitcoin Price: </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <h2>Bitcoin Price: {bitcoin}</h2>
    </div>
  );
}

export default App;