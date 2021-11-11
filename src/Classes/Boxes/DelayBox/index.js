import Delay from '../../Audio/Delay';
import Gain from '../../Audio/Gain';
import BasicBox from '../BasicBox';

export default class DelayBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings) {
    super(x, y, w, h, mediator, settings);
    this.type = 'delay';
    this.canConnect = ['master'];
    this.input = new Delay(100, 0.1);
    this.output = new Gain();
    this.input.setDelayTime(this.settings.delayTime);
    this.input.setFeedback(this.settings.feedback);
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
      if (setting === 'delayTime') {
        this.input.setDelayTime(this.settings.delayTime);
      }
      if (setting === 'feedback') {
        this.input.setFeedback(this.settings.feedback);
      }
    });
  }
}
