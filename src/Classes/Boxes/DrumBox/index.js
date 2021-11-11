import audio from '../../Audio/Audio';
import Gain from '../../Audio/Gain';
import BasicBox from '../BasicBox';
import HiHat1 from './sounds/hh_sample.mp3';
import Clap1 from './sounds/clap_sample.mp3';
import Bass1 from './sounds/bass_sample.mp3';
import HiHat2 from './sounds/edm-hi-hat.wav';
import Clap2 from './sounds/good-snare.wav';
import Bass2 from './sounds/808-kick.wav';
import Clock from '../../Clock';

export default class DrumBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings) {
    super(x, y, w, h, mediator, settings);
    this.canConnect = ['master', 'filter', 'reverb'];
    this.type = 'drum';
    this.output = new Gain();
    this.audioNode;
    this.clapNode;
    this.bassNode;
    this.clock = new Clock();
    this.currentTime;

    this.samples = [HiHat1, Clap1, Bass1, HiHat2, Clap2, Bass2];
    this.buffers = [];

    this.handlePlay();

    this.init();
    this.clock.start();
    this.clock.onmessage = (e) => {
      if (e.data === 'tick') {
        console.log(e.data);
        Object.keys(this.sequences).forEach((key) => {
          let { step, id, sequence } = this.sequences[key];
          step > sequence.length ? (step = 0) : step;

          if (sequence[step]) {
            this.playSound(id);
          }
          this.sequences[key].step++;
        });
      }
    };
  }

  handlePlay() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a':
          this.playSound(2);
          break;
        case 's':
          this.playSound(4);
          break;
        case 'd':
          this.playSound(3);
          break;
      }
    });
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
    });
  }

  async playSound(index) {
    let bufferSource = audio.context.createBufferSource();
    let sample = await fetch(this.samples[index]);
    sample = await sample.arrayBuffer();
    sample = await audio.context.decodeAudioData(sample);

    bufferSource.buffer = sample;
    bufferSource.connect(this.output.node);
    bufferSource.start(0);
  }

  async playNote(index) {
    await this.playSound(index);
  }
}
