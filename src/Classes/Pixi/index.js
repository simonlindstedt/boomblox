import * as PIXI from "pixi.js";
import GainBox from "../GainBox";
import OscBox from "../OscBox";
import FilterBox from "../FilterBox";

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
      let pitch = 13.75 * Math.pow(2, (i - 9) / 12) * 16;
      this.list.push(new OscBox(0, i * 70, 50, 50, "sawtooth", pitch));
    }

    // Gains
    for (let i = 0; i < 3; i++) {
      this.list.push(new GainBox(300, i * 200, 60, 60));
    }

    // Test
    for (let i = 0; i < 2; i++) {
      this.list.push(new FilterBox(600, i * 200, 70, 70));
    }

    window.onresize = () => {
      this.app.renderer.resize(this.ref.clientWidth, this.ref.clientHeight);
    };
  }

  update() {
    this.list.forEach((box) => {
      box.draw();

      // If box can connect
      if (box.canConnect) {
        let options = [];

        // Find connect options
        box.canConnect.forEach((option) => {
          options = [
            ...options,
            this.list.filter((item) => item.type === option),
          ];
          options = options.flat();
        });

        // For each option, check if close enough to connect
        for (let i = 0; i < options.length; i++) {
          let otherBox = options[i];

          // Connect if distance < 200 and is not currently connected
          if (box.distanceTo(otherBox) < 200 && !box.isConnectedTo(otherBox)) {
            box.connectTo(otherBox);
          }
        }
      }
      // If box have connections
      if (box.connections.length > 0) {
        // Loop through them
        box.connections.forEach((connection) => {
          let connectedBox = this.list.find(
            (item) => item.id === connection.id
          );

          // Disconnect if distance > 200
          if (box.distanceTo(connectedBox) > 200) {
            box.disconnectFrom(connectedBox);
          }
        });
      }
    });
  }

  start() {
    this.list.forEach((box) => {
      this.app.stage.addChild(box.container, box.connectionLine);
    });

    this.app.ticker.add(() => {
      this.update();
    });

    this.ref.appendChild(this.app.view);
  }
}
