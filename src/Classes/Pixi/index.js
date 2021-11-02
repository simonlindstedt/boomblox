import * as PIXI from "pixi.js";
import GainBox from "../Boxes/GainBox";
import OscBox from "../Boxes/OscBox";
import RecordingBox from "../Boxes/RecordingBox";
import ReverbBox from "../Boxes/ReverbBox";
import MasterBox from "../Boxes/MasterBox";
import FilterBox from "../Boxes/FilterBox";
import Clock from "../Clock";

export default class Pixi {
  constructor() {
    this.ref;
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
    const masterBox = new MasterBox(
      this.width / 2 - 30,
      this.height / 2 - 30,
      60,
      60
    );
    this.list.push(masterBox);

    this.app.stage.addChild(
      masterBox.proximityLine,
      masterBox.connectionLine,
      masterBox.container
    );

    // const recordingBox = new RecordingBox(10, 10, 80, 80);
    // this.list.push(recordingBox);
    // this.app.stage.addChild(
    //   recordingBox.proximityLine,
    //   recordingBox.connectionLine,
    //   recordingBox.container
    // );

    window.onresize = () => {
      if (this.ref) {
        this.app.renderer.resize(this.ref.clientWidth, this.ref.clientHeight);
      }
    };

    // Add reaction to each tick
    this.clock.worker.onmessage = (e) => {
      switch (e.data) {
        case "tick":
          this.clock.step++;
          break;
        default:
          return;
      }
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

  addBox(type) {
    console.log(type);

    switch (type) {
      case "gain":
        let gainBox = new GainBox(10, 10, 60, 60);
        this.app.stage.addChild(
          gainBox.proximityLine,
          gainBox.connectionLine,
          gainBox.container
        );
        this.list.push(gainBox);
        break;
      case "osc":
        let oscBox = new OscBox(10, 10, 60, 60);
        this.app.stage.addChild(
          oscBox.proximityLine,
          oscBox.connectionLine,
          oscBox.container
        );
        this.list.push(oscBox);
        break;
      case "filter":
        let filterBox = new FilterBox(10, 10, 60, 60);
        this.app.stage.addChild(
          filterBox.proximityLine,
          filterBox.connectionLine,
          filterBox.container
        );
        this.list.push(filterBox);
        break;
      case "reverb":
        let reverbBox = new ReverbBox(10, 10, 60, 60);
        this.list.push(reverbBox);
        this.app.stage.addChild(
          reverbBox.proximityLine,
          reverbBox.connectionLine,
          reverbBox.container
        );
        break;
      case "rec":
        let recBox = new RecordingBox(10, 10, 100, 100);
        this.list.push(recBox);
        this.app.stage.addChild(
          recBox.proximityLine,
          recBox.connectionLine,
          recBox.container
        );
        break;
      default:
        return;
    }
  }

  play() {
    this.clock.start();
  }

  pause() {
    this.clock.stop();
  }

  start(ref) {
    this.app.ticker.add(() => {
      this.update();
    });

    this.ref = ref;
    this.ref.appendChild(this.app.view);
  }
}
