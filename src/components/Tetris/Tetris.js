import React, { Component } from "react";
import { StyledMap } from "./Tetris.styles";
import GameOver from "../Gameover/GameOver";
import Box from "../Box/Box";
import Models from "./Models";

export default class Tetris extends Component {
  constructor() {
    super();
    this.FPS = 1000 / 5;
    this.mapWidth = 300;
    this.mapHeight = 600;
    this.boxHeight = 30;
    this.boxWidth = 30;
    this.boxCount = Math.floor((this.mapWidth * this.mapHeight) / Math.pow(this.boxWidth, 2)); //Kaç adet kutu olacağını hesaplıyoruz.

    this.nextRow = this.mapWidth / this.boxWidth; // Bir kutunun alt satıra inebilmesi için kaçıncı index numaralı kutuya denk geldiğini tutuyoruz.
    this.lastRowStart = this.boxCount - this.mapWidth / this.boxWidth; // Son satırın başlangıç kutusu
    this.firsRowFinish = this.nextRow; // İlk satırın son kutusu
    this.models = [];
    this.activeBoxes = [];

    this.boxes = []; //Render için
    this.landedBoxes = []; //İnen kutular
    this.direction = 0; // 1 olduğunda kutular sağa gider -1 olduğunda sola. Kullanıcının sağ sol tuşlarına basmasıyla tetiklenir.
    this.gameOver = false;
  }
  componentDidMount = () => {
    this.models = Models;
    document.addEventListener("keydown", this.handleKeyDown);
    this.loop();
  };
  handleKeyDown = e => {
    // User inputs.
    switch (e.key) {
      case "ArrowRight":
        this.direction = 1;
        break;

      case "ArrowLeft":
        this.direction = -1;
        break;

      default:
        break;
    }
  };
  loop = () => {
    // Oyun döngüsü
    this.gameLoop = setInterval(() => {
      if (this.activeBoxes.length === 0) this.generateActiveBoxes();
      this.updateBoxes();
      this.forceUpdate();
    }, this.FPS);
  };

  generateActiveBoxes = () => {
    // Modellerin oluşturulup Aktif kutulara eklenmesi
    const { model } = this.models[Math.floor(Math.random() * this.models.length)]; //Random model seçimi
    const randomStartBoxIntex = Math.floor((Math.random() * this.mapWidth) / this.boxWidth / 2); //Yukarıdan inecek kutuların başlangıç yerini random yapar.
    for (var i = 0; i < 3; i++) {
      if (model[i] === 1) this.activeBoxes.push(randomStartBoxIntex + i);
    }
    for (var j = 3; j < 6; j++) {
      if (model[j] === 1) this.activeBoxes.push(randomStartBoxIntex + this.nextRow + j - 3);
    }

    for (var k = 6; k < j + 9; k++) {
      if (model[k] === 1) this.activeBoxes.push(randomStartBoxIntex + this.nextRow * 2 + k - 6);
    }
  };

  checkBoxesPosition = () => {};

  updateBoxes = () => {
    //********************** BURASI TEKRAR YAZILACAK BUG VAR********************* */

    this.activeBoxes.map((box, index, boxes) => {
      //İnenleri tespit ediyoruz
      if (box >= this.lastRowStart || this.landedBoxes.includes(box + this.nextRow)) {
        boxes.map(xbox => {
          this.landedBoxes.push(xbox);
        });
        this.activeBoxes = []; //generateActiveBoxes'ın tekrar çalışmasını sağlar.
        return;
      }
      for (let i = 0; i < this.landedBoxes.length; i++) {
        // İnen kutular tepeyi buldumu kontrol
        if (this.landedBoxes[i] <= this.firsRowFinish) {
          clearInterval(this.gameLoop);
          this.gameOver = true;
          return;
        }
      }
    });
    //************************************************************************* */
    this.activeBoxes.map((box, index, boxes) => {
      this.activeBoxes[index] = box + this.nextRow + this.direction; // şekil kümesini bir alt satıra geçirme
    });
    this.direction = 0;
    let boxes = [];

    for (let index = 0; index < this.boxCount; index++) {
      // Tetris kutularının oluşturulması
      const boxBgColor = this.activeBoxes.includes(index) || this.landedBoxes.includes(index) ? "#fff" : "#222831";
      boxes.push(<Box key={index} boxHeight={this.boxHeight} boxWidth={this.boxWidth} bgColor={boxBgColor} />);
    }
    this.boxes = boxes;
  };

  restart = () => {
    this.activeBoxes = [];
    this.landedBoxes = [];
    this.boxes = [];
    this.gameOver = false;
    this.forceUpdate();
    this.loop();
  };

  render() {
    return (
      <>
        {!this.gameOver ? (
          <StyledMap height={this.mapHeight} width={this.mapWidth}>
            {this.boxes.map(box => box)}
          </StyledMap>
        ) : (
          <GameOver restart={this.restart} />
        )}
      </>
    );
  }
}
