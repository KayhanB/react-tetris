import React, { Component } from "react";
import "./App.css";
import Game from "./containers/Game/Game";

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Ömer faruk</h1>
        <Game />
      </div>
    );
  }
}

export default App;
