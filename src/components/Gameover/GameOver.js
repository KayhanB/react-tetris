import React, { Component } from "react";

export default class GameOver extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Game Over</h1>
        </div>
        <div>
          <a href="https://github.com/KayhanB/react-tetris" target="_blank">
            <img src="/img/GitHub-Mark-64px.png" />
          </a>
        </div>
        <button onClick={this.props.restart} style={{marginTop:20}}>
          Restart
        </button>
      </div>
    );
  }
}
