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
import ConnectionLine from '../Boxes/ConnectionLine';
import audio from '../Audio/Audio';

export default class Pixi {
  constructor(mediator) {
    this.audio = audio;
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
    this.clock = new Clock(120, 64);
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

    this.app.stage.addChild(this.master.connectionLine, this.master.container);

    // Add reaction to each tick
    this.clock.worker.onmessage = (e) => {
      if (e.data === 'tick') {
        let sequencerStates = [];

        // All sequencers
        this.sequencers.forEach((sequencer) => {
          sequencerStates.push({
            id: sequencer.id,
            step: sequencer.currentStep,
            belongsTo: sequencer.belongsTo,
          });
        });

        // Play all sequencers
        this.sequencers.forEach((sequencer) => {
          const speed = Math.floor(this.clock.resolution / sequencer.speed);
          if (this.clock.step % speed === 0) {
            let note = sequencer.play();

            // Send states to react (could probably be more effective).
            sequencerStates.map((states) => {
              if (states.id === sequencer.id) {
                states.step = sequencer.currentStep;
              }
            });

            this.mediator.post({ sequencerStates: sequencerStates });

            if (sequencer.connections) {
              sequencer.connections.forEach((connection) => {
                let box = this.list.find((item) => item.id === connection.id);
                if (note.play) {
                  if (box.playNote) {
                    box.playNote(
                      note.value * note.octave,
                      this.clock.tempo,
                      sequencer.speed
                    );
                  }
                  if (box.playSound) {
                    box.playSound(note.category, note.value);
                  }
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

      if (box.lines.length) {
        box.lines.forEach((line) => {
          line.draw();
        });
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

        // Handle connectionLines
        for (let i = 0; i < options.length; i++) {
          let otherBox = options[i];
          let line = box.lines.find((item) => item.id === otherBox.id);

          if (box.distanceTo(otherBox) < 400 && line === undefined) {
            let connectionLine = new ConnectionLine(box, otherBox);
            this.app.stage.addChild(connectionLine.graphics);
            box.lines.push(connectionLine);
          } else if (box.distanceTo(otherBox) > 400 && line !== undefined) {
            this.app.stage.removeChild(line.graphics);
            line.graphics.destroy(true);
            box.lines = box.lines.filter((item) => item.id !== line.id);
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

          // Disconnect if distance > 400
          if (box.distanceTo(connectedBox) > 400) {
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
    box.container.removeChildren(0, box.container.children.length);

    this.app.stage.removeChild(box.container);
    this.app.stage.removeChild(box.connectionLine);
    box.container.destroy(true);
    box.connectionLine.destroy(true);
    box.connections = [];
    box.input = null;
    box.output = null;
    console.log('flush flush');

    this.list = this.list.filter((item) => item.id !== box.id);
  }

  addBox(type, x, y) {
    let sequencerStates = [];
    if (x < this.width - 400) {
      switch (type) {
        case 'osc':
          let oscBox = new OscBox(x, y, 60, 60, this.mediator, {
            name: 'Osc',
            volume: 0.2,
            freq: 440,
            octave: 1,
            detune: 0,
            type: 'sine',
          });
          this.app.stage.addChild(oscBox.connectionLine, oscBox.container);
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
            reverbBox.connectionLine,
            reverbBox.container
          );
          break;
        case 'rec':
          let recBox = new RecordingBox(x - 30, y - 30, 60, 60, this.mediator, {
            volume: 0.2,
          });
          this.list.push(recBox);
          this.app.stage.addChild(recBox.connectionLine, recBox.container);
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
              maxValue: 0.5,
              type: 'sawtooth',
            }
          );
          this.list.push(amplitudeLfoBox);
          this.app.stage.addChild(
            amplitudeLfoBox.connectionLine,
            amplitudeLfoBox.container
          );
          break;
        case 'drum':
          const drumBox = new DrumBox(x, y, 60, 60, this.mediator, {
            name: 'Drum',
            volume: 1,
            speeds: [1, 1, 1, 1],
            sequences: [
              [
                { play: true, value: 0, category: 0 },
                { play: true, value: 0, category: 0 },
                { play: true, value: 0, category: 0 },
                { play: false, value: 0, category: 0 },
                { play: false, value: 0, category: 0 },
                { play: false, value: 0, category: 0 },
                { play: false, value: 0, category: 0 },
                { play: false, value: 0, category: 0 },
              ],
              [
                { play: false, value: 0, category: 1 },
                { play: false, value: 0, category: 1 },
                { play: false, value: 0, category: 1 },
                { play: false, value: 0, category: 1 },
                { play: false, value: 0, category: 1 },
                { play: false, value: 0, category: 1 },
                { play: false, value: 0, category: 1 },
                { play: false, value: 0, category: 1 },
              ],
              [
                { play: false, value: 0, category: 2 },
                { play: false, value: 0, category: 2 },
                { play: false, value: 0, category: 2 },
                { play: false, value: 0, category: 2 },
                { play: false, value: 0, category: 2 },
                { play: false, value: 0, category: 2 },
                { play: false, value: 0, category: 2 },
                { play: false, value: 0, category: 2 },
              ],
              [
                { play: false, value: 0, category: 3 },
                { play: false, value: 0, category: 3 },
                { play: false, value: 0, category: 3 },
                { play: false, value: 0, category: 3 },
                { play: false, value: 0, category: 3 },
                { play: false, value: 0, category: 3 },
                { play: false, value: 0, category: 3 },
                { play: false, value: 0, category: 3 },
              ],
            ],
          });

          this.list.push(drumBox);
          drumBox.sequencers.forEach((sequencer) => {
            this.sequencers.push(sequencer);
            sequencer.connectTo(drumBox);
          });

          this.app.stage.addChild(drumBox.connectionLine, drumBox.container);

          sequencerStates = [];

          this.sequencers.forEach((sequencer) => {
            sequencerStates.push({
              id: sequencer.id,
              step: sequencer.currentStep,
              belongsTo: sequencer.belongsTo,
            });
          });

          this.mediator.post({ sequencerStates: sequencerStates });
          break;
        case 'seq':
          const sequencerBox = new SequencerBox(x, y, 50, 50, this.mediator, {
            name: 'Seq',
            speed: 1,
            sequence: [
              { play: true, value: 440, octave: 1 },
              { play: true, value: 440, octave: 1 },
              { play: true, value: 440, octave: 1 },
              { play: false, value: 440, octave: 1 },
              { play: false, value: 440, octave: 1 },
              { play: false, value: 440, octave: 1 },
              { play: false, value: 440, octave: 1 },
            ],
          });

          this.sequencers.push(sequencerBox.sequencer);
          this.list.push(sequencerBox);
          this.app.stage.addChild(
            sequencerBox.connectionLine,
            sequencerBox.container
          );

          sequencerStates = [];

          this.sequencers.forEach((sequencer) => {
            sequencerStates.push({
              id: sequencer.id,
              step: sequencer.currentStep,
              belongsTo: sequencer.belongsTo,
            });
          });

          this.mediator.post({ sequencerStates: sequencerStates });
          break;
        case 'delay':
          const delayBox = new DelayBox(x, y, 50, 50, this.mediator, {
            volume: 0.2,
            name: 'Delay',
            feedback: 0.1,
            delayTime: 100,
          });

          this.list.push(delayBox);
          this.app.stage.addChild(delayBox.connectionLine, delayBox.container);
          break;
        default:
          break;
      }
    }
  }

  play() {
    this.clock.start();
    this.audio.context.resume();
  }

  pause() {
    this.clock.stop();
    this.audio.context.suspend();
  }

  setMasterVolume(volume) {
    this.master.input.setVolume(volume);
  }

  findAndChangeSettings(boxSettings) {
    this.list
      .find((box) => box.id === boxSettings.id)
      .changeSettings(boxSettings.settings);
  }

  start(ref) {
    this.app.ticker.speed = 0.1;
    this.app.ticker.add(() => {
      this.update();
    });

    this.ref = ref;
    this.ref.appendChild(this.app.view);

    window.onresize = () => {
      if (this.ref) {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
      }
    };
  }
}
