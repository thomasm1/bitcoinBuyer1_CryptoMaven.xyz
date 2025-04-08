import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import "./index.css"; // Make sure this is imported

const App = () => {
  return (
    <div className="layout">
      <Header />
      <main className="app-main">
        <div className="content">
          <hr />
       
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
