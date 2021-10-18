import * as PIXI from "pixi.js";

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
  }

  start() {
    this.ref.appendChild(this.app.view);
  }
}
