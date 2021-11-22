import Delay from '../../Audio/Delay';
import Gain from '../../Audio/Gain';
import BasicBox from '../BasicBox';

export default class DelayBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings) {
    super(x, y, w, h, mediator, settings);
    this.type = 'delay';
    this.canConnect = ['master', 'reverb', 'filter'];
    this.input = new Delay(this.settings.delayTime, this.settings.feedback);
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
      if (setting === 'delayTime') {
        this.input.setDelayTime(this.settings.delayTime);
      }
      if (setting === 'feedback') {
        this.input.setFeedback(this.settings.feedback);
      }
    });
  }
}
