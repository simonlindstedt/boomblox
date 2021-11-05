import * as PIXI from "pixi.js";
import OscBox from "../Boxes/OscBox";
import RecordingBox from "../Boxes/RecordingBox";
import ReverbBox from "../Boxes/ReverbBox";
import MasterBox from "../Boxes/MasterBox";
import FilterBox from "../Boxes/FilterBox";
import Clock from "../Clock";
import TrashCan from "../TrashCan";
import FrequencyLfoBox from "../Boxes/FrequencyLfoBox";
import AmplitudeLfoBox from "../Boxes/AmplitudeLfoBox";

export default class Pixi {
  constructor(mediator) {
    this.mediator = mediator;
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
    this.trash = new TrashCan(30, this.height - 80, 30, 40);
    this.init();
  }

  init() {
    this.app.stage.addChild(this.trash.container);

    const masterBox = new MasterBox(
      this.width / 2 - 50,
      this.height / 2 - 50,
      100,
      100,
      this.mediator,
      { name: "Master", volume: 0.5 }
    );
    this.list.push(masterBox);

    this.app.stage.addChild(
      masterBox.proximityLine,
      masterBox.connectionLine,
      masterBox.container
    );

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

      // delete boxes at will
      if (
        box.container.x <= this.trash.container.x &&
        box.container.y >= this.trash.container.y
      ) {
        this.deleteBox(box);
      }
    });
  }

  deleteBox(box) {
    if (box.container.children.length > 0) {
      box.container.children.forEach((child) => {
        box.container.removeChild(child);
      });
    }
    if (box.type == "osc") {
      box.input.node.stop();
    }
    this.app.stage.removeChild(box.container);
    this.app.stage.removeChild(box.connectionLine);
    this.app.stage.removeChild(box.proximityLine);
    box.container.graphics = {};
    box.connections = [];
    box.input = null;
    box.output = null;
    box.container.destroy(true);
    console.log("flush flush");

    this.list = this.list.filter((item) => item.id !== box.id);
  }

  addBox(type, x, y) {
    switch (type) {
      case "osc":
        let oscBox = new OscBox(x, y, 60, 60, this.mediator, {
          name: "Osc",
          volume: 0.2,
          freq: 550,
        });
        this.app.stage.addChild(
          oscBox.proximityLine,
          oscBox.connectionLine,
          oscBox.container
        );
        this.list.push(oscBox);
        break;
      case "filter":
        let filterBox = new FilterBox(x - 30, y - 30, 60, 60, this.mediator, {
          name: "Filter",
          volume: 0.2,
          freq: 20000,
        });
        this.app.stage.addChild(
          filterBox.proximityLine,
          filterBox.connectionLine,
          filterBox.container
        );
        this.list.push(filterBox);
        break;
      case "reverb":
        let reverbBox = new ReverbBox(x, y, 60, 60, this.mediator, {
          name: "Reverb",
          volume: 0.2,
        });
        this.list.push(reverbBox);
        this.app.stage.addChild(
          reverbBox.proximityLine,
          reverbBox.connectionLine,
          reverbBox.container
        );
        break;
      case "rec":
        let recBox = new RecordingBox(x - 30, y - 30, 60, 60, this.mediator, {
          volume: 0.2,
        });
        this.list.push(recBox);
        this.app.stage.addChild(
          recBox.proximityLine,
          recBox.connectionLine,
          recBox.container
        );
        break;
      case "frequency-lfo":
        const frequencyLfoBox = new FrequencyLfoBox(
          x,
          y,
          60,
          60,
          this.mediator,
          {
            name: "F-LFO",
            rate: 5,
            type: "sine",
            maxValue: 400,
          }
        );
        this.list.push(frequencyLfoBox);
        this.app.stage.addChild(
          frequencyLfoBox.proximityLine,
          frequencyLfoBox.connectionLine,
          frequencyLfoBox.container
        );
        break;
      case "amplitude-lfo":
        const amplitudeLfoBox = new AmplitudeLfoBox(
          x,
          y,
          60,
          60,
          this.mediator,
          {
            name: "A-LFO",
            rate: 5,
            type: "sawtooth",
            maxValue: 1,
          }
        );
        this.list.push(amplitudeLfoBox);
        this.app.stage.addChild(
          amplitudeLfoBox.proximityLine,
          amplitudeLfoBox.connectionLine,
          amplitudeLfoBox.container
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

  findAndChangeSettings(boxSettings) {
    let box = this.list.find((box) => box.id === boxSettings.id);
    box.changeSettings(boxSettings.settings);
  }

  start(ref) {
    this.app.ticker.add(() => {
      this.update();
    });

    this.ref = ref;
    this.ref.appendChild(this.app.view);
  }
}
