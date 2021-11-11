import * as PIXI from 'pixi.js';
import OscBox from '../Boxes/OscBox';
import RecordingBox from '../Boxes/RecordingBox';
import ReverbBox from '../Boxes/ReverbBox';
import MasterBox from '../Boxes/MasterBox';
import FilterBox from '../Boxes/FilterBox';
import Clock from '../Clock';
import TrashCan from '../TrashCan';
import FrequencyLfoBox from '../Boxes/FrequencyLfoBox';
import AmplitudeLfoBox from '../Boxes/AmplitudeLfoBox';
import SequencerBox from '../Boxes/SequencerBox';
import DrumBox from '../Boxes/DrumBox';
import DelayBox from '../Boxes/DelayBox';

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
    this.clock = new Clock(120, 8);
    this.sequencers = [];
    this.trash = new TrashCan(30, this.height - 80, 30, 40);
    this.master = new MasterBox(
      this.width / 2 - 50,
      this.height / 2 - 50,
      100,
      100,
      this.mediator,
      { name: 'Master', volume: 0.5 }
    );
    this.init();
  }

  init() {
    this.app.stage.addChild(this.trash.container);

    this.list.push(this.master);

    this.app.stage.addChild(
      this.master.proximityLine,
      this.master.connectionLine,
      this.master.container
    );

    // Add reaction to each tick
    this.clock.worker.onmessage = (e) => {
      if (e.data === 'tick') {
        let sequencerStates = [];

        this.sequencers.forEach((sequencer) => {
          const speed = Math.floor(this.clock.resolution / sequencer.speed);

          if (this.clock.step % speed === 0) {
            let note = sequencer.play();

            // Send states to react
            this.sequencers.forEach((sequencer) => {
              sequencerStates.push({
                id: sequencer.id,
                step: sequencer.currentStep,
              });

              this.mediator.post({ sequencerStates: sequencerStates });
            });

            if (sequencer.connections) {
              sequencer.connections.forEach((connection) => {
                let box = this.list.find((item) => item.id === connection.id);
                if (note.play) {
                  box.playNote(note.value, this.clock.tempo, sequencer.speed);
                }
              });
            }
          }
        });
        this.clock.step++;
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
        box.container.y >= this.trash.container.y &&
        box.type != 'master'
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
    if (box.type == 'osc') {
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
    console.log('flush flush');

    this.list = this.list.filter((item) => item.id !== box.id);
  }

  addBox(type, x, y) {
    if (x < this.width - 400) {
      switch (type) {
        case 'osc':
          let oscBox = new OscBox(x, y, 60, 60, this.mediator, {
            name: 'Osc',
            volume: 0.2,
            freq: 550,
            type: 'sine',
          });
          this.app.stage.addChild(
            oscBox.proximityLine,
            oscBox.connectionLine,
            oscBox.container
          );
          this.list.push(oscBox);
          break;
        case 'filter':
          let filterBox = new FilterBox(x - 30, y - 30, 60, 60, this.mediator, {
            name: 'Filter',
            volume: 0.2,
            freq: 20000,
            type: 'lowpass',
          });
          this.app.stage.addChild(
            filterBox.proximityLine,
            filterBox.connectionLine,
            filterBox.container
          );
          this.list.push(filterBox);
          break;
        case 'reverb':
          let reverbBox = new ReverbBox(x, y, 60, 60, this.mediator, {
            name: 'Reverb',
            volume: 0.2,
          });
          this.list.push(reverbBox);
          this.app.stage.addChild(
            reverbBox.proximityLine,
            reverbBox.connectionLine,
            reverbBox.container
          );
          break;
        case 'rec':
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
        case 'frequency-lfo':
          const frequencyLfoBox = new FrequencyLfoBox(
            x,
            y,
            60,
            60,
            this.mediator,
            {
              name: 'F-LFO',
              rate: 5,
              maxValue: 400,
              type: 'sine',
            }
          );
          this.list.push(frequencyLfoBox);
          this.app.stage.addChild(
            frequencyLfoBox.proximityLine,
            frequencyLfoBox.connectionLine,
            frequencyLfoBox.container
          );
          break;
        case 'amplitude-lfo':
          const amplitudeLfoBox = new AmplitudeLfoBox(
            x,
            y,
            60,
            60,
            this.mediator,
            {
              name: 'A-LFO',
              rate: 5,
              maxValue: 1,
              type: 'sawtooth',
            }
          );
          this.list.push(amplitudeLfoBox);
          this.app.stage.addChild(
            amplitudeLfoBox.proximityLine,
            amplitudeLfoBox.connectionLine,
            amplitudeLfoBox.container
          );
          break;
        case 'drum':
          const drumBox = new DrumBox(x, y, 60, 60, this.mediator, {
            name: 'Drumbox',
            volume: 1,
          });
          this.list.push(drumBox);
          this.app.stage.addChild(
            drumBox.proximityLine,
            drumBox.connectionLine,
            drumBox.container
          );
          break;
        case 'seq':
          const sequencerBox = new SequencerBox(
            x,
            y,
            50,
            50,
            this.mediator,
            {
              name: 'Seq',
              speed: 1 / 1,
              sequence: [
                { play: true, value: 220 },
                { play: true, value: 220 },
                { play: true, value: 220 },
                { play: false, value: 220 },
              ],
            },
            this.clock
          );

          this.sequencers.push(sequencerBox);
          this.list.push(sequencerBox);
          this.app.stage.addChild(
            sequencerBox.proximityLine,
            sequencerBox.connectionLine,
            sequencerBox.container
          );

          let sequencerStates = [];

          this.sequencers.forEach((sequencer) => {
            sequencerStates.push({
              id: sequencer.id,
              step: sequencer.currentStep,
            });
          });

          this.mediator.post({ sequencerStates: sequencerStates });
        case 'delay':
          const delayBox = new DelayBox(x, y, 50, 50, this.mediator, {
            volume: 0.2,
            name: 'Delay',
            feedback: 0.1,
            delayTime: 100,
          });

          this.list.push(delayBox);
          this.app.stage.addChild(
            delayBox.proximityLine,
            delayBox.connectionLine,
            delayBox.container
          );
          break;
        default:
          return;
      }
    }
  }

  play() {
    this.clock.start();
  }

  pause() {
    this.clock.stop();
  }

  setMasterVolume(volume) {
    this.master.input.setVolume(volume);
  }

  findAndChangeSettings(boxSettings) {
    // let box = this.list.find((box) => box.id === boxSettings.id);
    // box.changeSettings(boxSettings.settings);
    this.list
      .find((box) => box.id === boxSettings.id)
      .changeSettings(boxSettings.settings);
  }

  start(ref) {
    this.app.ticker.add(() => {
      this.update();
    });

    this.ref = ref;
    this.ref.appendChild(this.app.view);

    window.onresize = () => {
      if (this.ref) {
        this.app.renderer.resize(this.ref.clientWidth, this.ref.clientHeight);
      }
    };
  }
}
