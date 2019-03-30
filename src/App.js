import React, { Component } from "react";
import "./App.css";
// import Tetris from "./components/Tetris/Tetris.js";
import Game from "./containers/Game/Game";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
