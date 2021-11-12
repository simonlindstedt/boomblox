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

    this.init();
    this.setup();
  }

  setup() {
    for (let i = 0; i < this.samples.length / 2; i++) {
      this.sequencers.push(
        new Sequencer(this.settings.speeds[i], this.settings.sequences[i])
      );
    }
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

  async loadSound(index) {
    let bufferSource = audio.context.createBufferSource();
    let sample = await fetch(this.samples[index]);
    sample = await sample.arrayBuffer();
    sample = await audio.context.decodeAudioData(sample);

    bufferSource.buffer = sample;
    bufferSource.connect(this.output.node);
    bufferSource.start(0);
  }

  async playSound(index) {
    await this.loadSound(index);
  }
}
