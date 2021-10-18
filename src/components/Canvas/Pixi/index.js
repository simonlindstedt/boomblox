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
    this.mousePosition = { x: 0, y: 0 };
    this.setupInteraction();
  }

  setupInteraction() {
    this.app.view.addEventListener("mousemove", (event) => {
      this.mousePosition = {
        x: event.x,
        y: event.y,
      };
    });
  }

  start() {
    this.ref.appendChild(this.app.view);
  }
}
