import audio from '../../Audio/Audio';
import Gain from '../../Audio/Gain';
import BasicBox from '../BasicBox';
import HiHat1 from './sounds/hh_sample.mp3';
import Clap1 from './sounds/clap_sample.mp3';
import Bass1 from './sounds/bass_sample.mp3';
import HiHat2 from './sounds/edm-hi-hat.wav';
import Clap2 from './sounds/good-snare.wav';
import Bass2 from './sounds/808-kick.wav';
import Sequencer from '../../Audio/Sequencer';

export default class DrumBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings) {
    super(x, y, w, h, mediator, settings);
    this.canConnect = ['master', 'filter', 'reverb'];
    this.type = 'drum';
    this.output = new Gain();
    this.audioNode;
    this.clapNode;
    this.bassNode;
    this.currentTime;
    this.sequencers = [];
    this.samples = [HiHat1, Clap1, Bass1, HiHat2, Clap2, Bass2];
    this.buffers = [];
    // this.buffer = null;

    this.init();
    this.setup();
  }

  async setup() {
    for (let i = 0; i < this.samples.length / 2; i++) {
      this.sequencers.push(
        new Sequencer(this.settings.speeds[i], this.settings.sequences[i])
      );
    }

    for (let i = 0; i < this.samples.length; i++) {
      let sample = this.samples[i];
      let buffer = await fetch(sample);
      buffer = await buffer.arrayBuffer();
      buffer = await audio.context.decodeAudioData(buffer);
      this.buffers.push(buffer);
      console.log('for');
    }
    console.log(this.buffers);
  }

  connectTo(box) {
    this.addToConnectionList(box);
    this.output.connectTo(box.input);
  }

  disconnectFrom(box) {
    this.connections = this.connections.filter((item) => item.id !== box.id);
    this.output.disconnectFrom(box.input);
  }

  changeSettings(settings) {
    this.settings = settings;
    Object.keys(this.settings).forEach((setting) => {
      if (setting === 'volume') {
        this.output.setVolume(this.settings.volume);
      }
      if (setting === 'sequences') {
        this.settings.sequences.forEach((sequence, key) => {
          this.sequencers[key].sequence = sequence;
        });
      }
    });
  }

  // load(index) {
  //   const request = new XMLHttpRequest();
  //   request.open('GET', this.samples[index]);
  //   console.log(this.samples[index]);
  //   request.responseType = 'arraybuffer';
  //   request.onload = function () {
  //     let undecodedAudio = request.response;
  //     audio.context.decodeAudioData(undecodedAudio, (data) => (buffer = data));
  //   };
  //   request.send();
  // }

  // play() {
  //   const source = audio.context.createBufferSource();
  //   source.buffer = this.buffer;
  //   source.connect(this.output.node);
  //   source.start();
  // }

  loadSound(index) {
    let bufferSource = audio.context.createBufferSource();
    // let sample = await fetch(this.samples[index]);
    // sample = await sample.arrayBuffer();
    // sample = await audio.context.decodeAudioData(sample);

    bufferSource.buffer = this.buffers[index];
    bufferSource.connect(this.output.node);
    bufferSource.start(0);
    bufferSource.stop(audio.context.currentTime + bufferSource.buffer.duration);
  }

  playSound(index) {
    this.loadSound(index);
  }
}
