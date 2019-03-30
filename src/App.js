import React, { Component } from "react";
import "./App.css";
import Game from "./containers/Game/Game";

class App extends Component {
  render() {
    return (
      <div className="App">
        <a href="https://github.com/KayhanB/react-tetris" target="_blank" style={{ position: "fixed", top: 10, right: 10 }}> 
          <img style={{ position: "fixed", top: 10, right: 10 }} src="/img/GitHub-Mark-32px.png" />
        </a>
        <Game />
      </div>
    );
  }
}

export default App;
