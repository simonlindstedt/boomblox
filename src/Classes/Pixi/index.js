import * as PIXI from 'pixi.js';
import GainBox from '../Boxes/GainBox';
import OscBox from '../Boxes/OscBox';
import RecordingBox from '../Boxes/RecordingBox';
import ReverbBox from '../Boxes/ReverbBox';
import MasterBox from '../Boxes/MasterBox';
import FilterBox from '../Boxes/FilterBox';

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
    this.list.push(new RecordingBox(100, 100, 100, 100));
    this.list.push(new ReverbBox(20, 40, 100, 100));
    this.list.push(new FilterBox(200, 600, 50, 50));
    this.list.push(new GainBox(300, 200, 50, 50, 0.2));
    this.list.push(
      new MasterBox(this.width / 2 - 100, this.height / 2 - 100, 200, 200)
    );

    window.onresize = () => {
      this.app.renderer.resize(this.ref.clientWidth, this.ref.clientHeight);
    };
  }

  update() {
    this.list.forEach((box) => {
      box.draw();

      if (box.visualize) {
        box.visualize();
      }

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

  start() {
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

    this.ref.appendChild(this.app.view);
  }
}
