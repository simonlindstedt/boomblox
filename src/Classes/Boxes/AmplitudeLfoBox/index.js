import AmplitudeLfo from '../../Audio/AmplitudeLfo';
import BasicBox from '../BasicBox';

export default class AmplitudeLfoBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings) {
    super(x, y, w, h, mediator, settings);
    this.type = 'amplitude-lfo';
    this.canConnect = ['osc'];
    this.lfo = new AmplitudeLfo(
      this.settings.rate,
      this.settings.type,
      this.settings.maxValue
    );
    this.init();
  }

  connectTo(box) {
    this.addToConnectionList(box);
    this.lfo.connectTo(box.output);
  }

  disconnectFrom(box) {
    this.connections = this.connections.filter((item) => item.id !== box.id);
    this.lfo.disconnectFrom(box.output);
  }

  changeSettings(settings) {
    this.settings = settings;
    Object.keys(this.settings).forEach((setting) => {
      if (setting === 'rate') {
        this.lfo.setRate(this.settings.rate);
      }
      if (setting === 'maxValue') {
        this.lfo.setMaxValue(this.settings.maxValue);
      }
      if (setting === 'type') {
        this.lfo.setType(this.settings.type);
      }
    });
  }
}
