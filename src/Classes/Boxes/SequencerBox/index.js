import BasicBox from '../BasicBox';

export default class SequencerBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings, clock) {
    super(x, y, w, h, mediator, settings);
    this.type = 'seq';
    this.clock = clock;
    this.canConnect = ['osc'];
    this.sequence = this.settings.sequence;
    this.count = 0;
    this.currentStep = 0;
    this.speed = this.settings.speed;
    this.init();
  }

  play() {
    this.currentStep = this.count++ % this.sequence.length;
    return this.sequence[this.currentStep];
  }

  changeSettings(settings) {
    this.settings = settings;
    Object.keys(this.settings).forEach((setting) => {
      if (setting === 'sequence') {
        this.sequence = this.settings.sequence;
      }
      if (setting === 'speed') {
        this.speed = this.settings.speed;
      }
    });
  }

  connectTo(box) {
    this.addToConnectionList(box);
  }

  disconnectFrom(box) {
    this.connections = this.connections.filter((item) => item.id !== box.id);
  }
}
