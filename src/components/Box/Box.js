import React, { Component } from "react";
import { StyledBox } from "./Box.styles";

export default class Box extends Component {
//   constructor() {
//     super();
//     this.isActive = null;
//   }
//   shouldComponentUpdate(nextProps, nextState) {
//     if (nextProps.isActive && this.isActive === null) {
//       this.isActive = true;
//       return true;
//     }
//     if (!nextProps.isActive && this.isActive === false) {
//       this.isActive = null;
//       return true;
//     }
//     if (!nextProps.isActive && this.isActive === true) {
//       this.isActive = null;
//       return true;
//     }
//     return false;
//     // if (nextProps.bgColor === "#fff") {
//     //   this.isActive = true;
//     //   return true;
//     // }
//     // if (!this.isActive && !nextProps.bgColor === "#fff") {
//     //   return true;
//     // }
//     // if (this.isActive && !nextProps.bgColor === "#fff") {
//     //   this.isActive = false;
//     //   return true;
//     // }
//     // if (!this.isActive && !nextProps.bgColor === "#fff") {
//     //   return false;
//     // }
//   }

  render() {
    const { boxHeight, boxWidth, bgColor } = this.props;

    return <StyledBox height={boxHeight} width={boxWidth} bgColor={bgColor} />;
  }
}
