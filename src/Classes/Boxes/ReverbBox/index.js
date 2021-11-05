import BasicBox from '../BasicBox';
import impulse from './sound/ir.wav';
import Reverb from '../../Audio/Reverb';
import Gain from '../../Audio/Gain';

export default class ReverbBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings) {
    super(x, y, w, h, mediator, settings);
    this.type = 'reverb';
    this.canConnect = ['master'];
    this.input = new Reverb(impulse);
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
    });
  }
}
