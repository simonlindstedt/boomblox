import * as PIXI from "pixi.js";
import GainBox from "../Boxes/GainBox";
import OscBox from "../Boxes/OscBox";
import FilterBox from "../Boxes/FilterBox";
import MasterBox from "../Boxes/MasterBox";
import Clock from "../Clock";

export default class Pixi {
  constructor() {
    this.ref = null;
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
    this.clock = new Clock();
    this.init();
  }

  init() {
    // // Oscs
    // for (let i = 0; i < 1; i++) {
    //   let pitch = 13.75 * Math.pow(2, (i - 9) / 12) * 16;
    //   this.list.push(new OscBox(0, i * 70, 50, 50, "sawtooth", pitch));
    // }

    // // Gains
    // for (let i = 0; i < 1; i++) {
    //   this.list.push(new GainBox(300, i * 200, 60, 60));
    // }

    // // Test
    // for (let i = 0; i < 2; i++) {
    //   this.list.push(new FilterBox(600, i * 200, 70, 70));
    // }

    // Master
    this.list.push(new MasterBox(this.width / 2, this.height / 2, 100, 100));

    window.onresize = () => {
      if (this.ref) {
        this.app.renderer.resize(this.ref.clientWidth, this.ref.clientHeight);
      }
    };

    // Add reaction to each tick
    this.clock.worker.onmessage = (e) => {
      switch (e.data) {
        case "tick":
          console.log("tick");
          break;
        default:
          return;
      }
    };

    // Start the clock
    this.clock.start();
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

        box.options = options;

        // For each option, check if close enough to connect
        // for (let i = 0; i < options.length; i++) {
        //   let otherBox = options[i];

        //   // Connect if distance < 200 and is not currently connected
        //   if (box.distanceTo(otherBox) < 200 && !box.isConnectedTo(otherBox)) {
        //     box.connectTo(otherBox);
        //   }
        // }
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

  start(ref) {
    this.list.forEach((box) => {
      this.app.stage.addChild(
        box.proximityLine,
        box.connectionLine,
        box.container
      );
    });

    this.app.ticker.add(() => {
      this.update();
    });

    this.ref = ref;
    this.ref.appendChild(this.app.view);
  }
}
