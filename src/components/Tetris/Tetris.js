import React, { Component } from "react";
import { StyledMap } from "./Tetris.styles";
import GameOver from "../Gameover/GameOver";
import Box from "../Box/Box";
import Models from "./Models";

export default class Tetris extends Component {
  constructor() {
    super();
    this.FPS = 1000 / 8;
    this.mapWidth = 260;
    this.mapHeight = 500;
    this.boxHeight = 20;
    this.boxWidth = 20;
    this.boxCount = Math.floor((this.mapWidth * this.mapHeight) / Math.pow(this.boxWidth, 2)); //Kaç adet kutu olacağını hesaplıyoruz.

    this.boxCountInOneRow = this.mapWidth / this.boxWidth; // Bir kutunun alt satıra inebilmesi için kaçıncı index numaralı kutuya denk geldiğini tutuyoruz.
    this.lastRowStart = this.boxCount - this.mapWidth / this.boxWidth; // Son satırın başlangıç kutusu
    this.firsRowFinish = this.boxCountInOneRow; // İlk satırın son kutusu
    this.models = [];
    this.activeModel = [];
    this.activeBoxes = [];
    this.randomStartBoxIntex = null;

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
    switch (e.code) {
      case "ArrowRight":
        if (this.obstacle("ArrowRight")) this.direction = 1;
        break;

      case "ArrowLeft":
        if (this.obstacle("ArrowLeft")) this.direction = -1;
        break;
      case "Space":
        if (this.obstacle("Space")) {
          this.rotateModel();
          this.transformActiveBoxes();
        }
      default:
        break;
    }
  };
  loop = () => {
    // Oyun döngüsü
    console.log("object");
    this.gameLoop = setInterval(() => {
      if (this.activeBoxes.length === 0) this.generateActiveBoxes();
      this.touchCheck();
      this.update();
      this.forceUpdate();
    }, this.FPS);
  };

  generateActiveBoxes = () => {
    // Modellerin oluşturulup Aktif kutulara eklenmesi
    const { model } = this.models[Math.floor(Math.random() * this.models.length)]; //Random model seçimi
    let formattedModel = [];
    model.map(row => {
      formattedModel = formattedModel.concat(row);
    });
    this.activeModel = model;

    let randomStartBoxIntex = Math.floor((Math.random() * this.mapWidth) / this.boxWidth / 2); //Yukarıdan inecek kutuların başlangıç yerini random yapar.

    for (var i = 0; i < 3; i++) {
      if (formattedModel[i] === 1) this.activeBoxes.push(randomStartBoxIntex + i);
    }
    for (var j = 3; j < 6; j++) {
      if (formattedModel[j] === 1) this.activeBoxes.push(randomStartBoxIntex + this.boxCountInOneRow + j - 3);
    }

    for (var k = 6; k < j + 9; k++) {
      if (formattedModel[k] === 1) this.activeBoxes.push(randomStartBoxIntex + this.boxCountInOneRow * 2 + k - 6);
    }
  };
  transformActiveBoxes = () => {
    let activeBoxes = this.activeBoxes;
    this.activeBoxes = [];
    let formattedModel = [];
    this.activeModel.map(row => {
      formattedModel = formattedModel.concat(row);
    });

    let firsActiveBoxIndex = activeBoxes[0];
    let n = 1;
    this.activeModel[0].map((x, i) => {
      if (x === 1 && i == 1) n = i - 1;
    });
    for (var i = 0; i < 3; i++) {
      if (formattedModel[i] === 1) this.activeBoxes.push(firsActiveBoxIndex - n + i);
    }
    for (var j = 3; j < 6; j++) {
      if (formattedModel[j] === 1) this.activeBoxes.push(firsActiveBoxIndex - n + this.boxCountInOneRow + j - 3);
    }
    for (var k = 6; k < j + 9; k++) {
      if (formattedModel[k] === 1) this.activeBoxes.push(firsActiveBoxIndex - n + this.boxCountInOneRow * 2 + k - 6);
    }
  };

  obstacle = code => {
    for (let i = 0; i < this.activeBoxes.length; i++) {
      if (this.activeBoxes[i] % this.boxCountInOneRow === 0 && code === "ArrowLeft") return false;
      if ((this.activeBoxes[i] + 1) % this.boxCountInOneRow === 0 && code === "ArrowRight") return false;

      if (this.landedBoxes.includes(this.activeBoxes[i] + 1)) return false;
      if (this.landedBoxes.includes(this.activeBoxes[i] - 1)) return false;
      if (this.landedBoxes.includes(this.activeBoxes[i] + this.boxCountInOneRow - 1)) return false;
      if (this.landedBoxes.includes(this.activeBoxes[i] + this.boxCountInOneRow + 1)) return false;

      if (this.activeBoxes[i] % this.boxCountInOneRow === 0 && code === "Space") return false;
      if ((this.activeBoxes[i] + 1) % this.boxCountInOneRow === 0 && code === "Space") return false;
    }
    console.log(code);
    return true;
  };

  touchCheck = () => {
    for (let i = 0; i < this.activeBoxes.length; i++) {
      let box = this.activeBoxes[i];
      // Kutular indimi ve başka bir kutunun üzerine indimi kontrolü
      if (box >= this.lastRowStart || this.landedBoxes.includes(box + this.boxCountInOneRow)) {
        for (let i = 0; i < this.activeBoxes.length; i++) {
          this.landedBoxes.push(this.activeBoxes[i]);
        }
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
    }
  };

  rotateModel = () => {
    let activeModel = this.activeModel;
    var origModel = activeModel.slice();
    for (var i = 0; i < activeModel.length; i++) {
      var row = activeModel[i].map(function(x, j) {
        var k = activeModel.length - 1 - j;
        return origModel[k][i];
      });
      activeModel[i] = row;
    }
    this.activeModel = activeModel;
  };

  update = () => {
    for (let i = 0; i < this.activeBoxes.length; i++) {
      this.activeBoxes[i] = this.activeBoxes[i] + this.boxCountInOneRow + this.direction;
    }
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
            <a href="https://github.com/KayhanB/react-tetris" target="_blank" style={{ position: "fixed", top: 10, right: 10 }}>
              <img src="/img/GitHub-Mark-32px.png" />
            </a>
            {this.boxes}
          </StyledMap>
        ) : (
          <GameOver restart={this.restart} />
        )}
      </>
    );
  }
}
