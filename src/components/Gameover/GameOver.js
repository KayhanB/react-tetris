import React, { Component } from "react";

export default class GameOver extends Component {
  render() {
    return (
      <div>
        <h1>Game Over</h1>
        <button onClick={this.props.restart}>Restart</button>
      </div>
    );
  }
}
