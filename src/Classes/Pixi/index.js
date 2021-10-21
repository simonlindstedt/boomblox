import * as PIXI from "pixi.js";
import OscBox from "../OscBox";
import GainBox from "../GainBox";

export default class Pixi {
  constructor(ref) {
    this.ref = ref;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio,
      backgroundColor: 0x000000,
    });
    this.boxes = [];
    this.init();
  }

  init() {
    let osc = new OscBox(0, 0, 40, 40, "sawtooth");
    let gainOne = new GainBox(0, 300, 50, 50);
    let gainTwo = new GainBox(0, 600, 50, 50);

    gainOne.gain.setVolume(0.4);
    gainTwo.gain.setVolume(0.8);

    this.boxes.push(osc);
    this.boxes.push(gainOne);
    this.boxes.push(gainTwo);
  }

  update() {
    this.boxes.forEach((box, i) => {
      box.draw();
    });
  }

  start() {
    this.boxes.forEach((box) => {
      this.app.stage.addChild(box.graphics);
    });

    this.app.ticker.add(() => {
      this.update();
    });
    this.ref.appendChild(this.app.view);
  }
}
