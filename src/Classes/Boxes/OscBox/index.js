import Oscillator from '../../Audio/Oscillator';
import Gain from '../../Audio/Gain';
import BasicBox from '../BasicBox';

export default class OscBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings) {
    super(x, y, w, h, mediator, settings);
    this.type = 'osc';
    this.octave = this.settings.octave;
    this.canConnect = ['master', 'filter', 'reverb', 'delay'];
    this.input = new Oscillator(this.settings.type, this.settings.freq);
    this.output = new Gain();
    this.init();
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
      if (setting === 'freq') {
        this.input.setFrequency(this.settings.freq * this.octave);
      }
      if (setting === 'type') {
        this.input.setType(this.settings.type);
      }
      if (setting === 'octave') {
        this.octave = this.settings.octave;
        this.input.setFrequency(this.settings.freq * this.octave);
      }
      if (setting === 'detune') {
        this.input.setDetune(this.settings.detune);
      }
    });
  }

  playNote(pitch, tempo, noteLength) {
    let now = this.output.audio.context.currentTime;
    let length = (60 / tempo) * (1 / noteLength);
    this.input.setFrequency(pitch);
    this.output.node.gain.cancelScheduledValues(now);
    this.output.node.gain.linearRampToValueAtTime(
      this.settings.volume,
      now,
      0.1
    );
    this.output.node.gain.linearRampToValueAtTime(0.0001, now + length, 0.1);
  }
}
