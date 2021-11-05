import Master from '../../Audio/Master';
import BasicBox from '../BasicBox';
import Visualizer from '../Visualizer';
export default class MasterBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings) {
    super(x, y, w, h, mediator, settings);
    this.type = 'master';
    this.input = new Master();
    this.input.setVolume(settings.volume);
    this.visualizer = new Visualizer();
    this.dimensions = { w, h };
    this.graphics = {
      ...this.graphics,
      visualizer: this.visualizer.graphics,
    };
    this.visualizer.analyser.fftSize = 256;
    this.input.node.connect(this.visualizer.analyser);
    this.init();
  }

  changeSettings(settings) {
    this.settings = settings;
    Object.keys(this.settings).forEach((setting) => {
      if (setting === 'volume') {
        this.input.setVolume(this.settings.volume);
      }
    });
  }

  visualize() {
    this.visualizer.masterDraw(this.dimensions.w);
  }
}
