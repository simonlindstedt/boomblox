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
    this.boxes = {};
    this.init();
  }

  init() {
    // Osc
    let oscs = [];
    for (let i = 0; i < 2; i++) {
      let oscNode = new OscBox(0, i * 500, 50, 50, "sawtooth");
      oscs.push(oscNode);
    }

    this.boxes = { ...this.boxes, oscs };

    // Gain
    let gains = [];
    for (let i = 0; i < 5; i++) {
      let gainNode = new GainBox(400, i * 200, 50, 50);
      gainNode.gain.setVolume(0.2);
      gains.push(gainNode);
    }

    this.boxes = { ...this.boxes, gains };
    console.log(this.boxes);
  }

  update() {
    Object.keys(this.boxes).forEach((key) => {
      this.boxes[key].forEach((box) => {
        box.draw();

        if (box instanceof OscBox && !box.connection.isConnected) {
          // Check for available boxes.
          // Connect if less than 200.

          let gains = this.boxes["gains"];

          for (let i = 0; i < gains.length; i++) {
            let gainBox = gains[i];

            if (
              box.distanceTo(gainBox) < 200 &&
              !gainBox.connection.isConnected
            ) {
              box.connectTo(gainBox, gainBox.id);
              break;
            }
          }
        }

        if (box instanceof OscBox && box.connection.isConnected) {
          // Check how close connected box is.
          // Disconnect if more than 200.

          // let connectedBox = this.boxes["gains"][box.connection.to];
          let connectedBox = this.boxes["gains"].find(
            (item) => item.id === box.connection.boxId
          );

          if (box.distanceTo(connectedBox) > 200) {
            box.disconnectFrom(connectedBox);
          }
        }
      });
    });
  }

  start() {
    Object.keys(this.boxes).forEach((key) => {
      this.boxes[key].forEach((box) => {
        this.app.stage.addChild(box.graphics);
      });
    });

    this.app.ticker.add(() => {
      this.update();
    });

    this.ref.appendChild(this.app.view);
  }
}
