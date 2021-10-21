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
    this.list = [];
    this.init();
  }

  init() {
    // Oscs
    for (let i = 0; i < 2; i++) {
      this.list.push(new OscBox(0, i * 100, 50, 50, "sawtooth"));
    }
    // Gains
    for (let i = 0; i < 3; i++) {
      let gainNode = new GainBox(300, i * 100, 40, 40);
      gainNode.gain.setVolume(0.2);
      this.list.push(gainNode);
    }
  }

  update() {
    this.list.forEach((box) => {
      // Draw box
      box.draw();

      // If box can connect and have no current connection
      if (box.canConnect && !box.connection.isConnected) {
        let options = [];

        // Find options to connect to
        box.canConnect.forEach((option) => {
          options = this.list.filter((item) => item.type === option);
        });

        // Loop through the options
        for (let i = 0; i < options.length; i++) {
          let otherBox = options[i];

          // If option is close enough, then connect and break the loop
          if (
            box.distanceTo(otherBox) < 200 &&
            !otherBox.connection.isConnected
          ) {
            box.connectTo(otherBox);
            break;
          }
        }
      }

      // If box can connect and is connected
      if (box.canConnect && box.connection.isConnected) {
        // Find the connected box
        let connectedBox = this.list.find(
          (item) => box.connection.boxId === item.id
        );

        // If distance > 200, then disconnect
        if (box.distanceTo(connectedBox) > 200) {
          box.disconnectFrom(connectedBox);
        }
      }
    });
  }

  start() {
    this.list.forEach((box) => {
      this.app.stage.addChild(box.graphics);
    });

    this.app.ticker.add(() => {
      this.update();
    });

    this.ref.appendChild(this.app.view);
  }
}
