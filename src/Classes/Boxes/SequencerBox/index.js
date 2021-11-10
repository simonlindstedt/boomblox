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
    this.speed = 1 / this.settings.speed;
    this.init();
  }

  setStep(step, value) {
    this.sequence[step] = { play: false, value: value };
  }

  addStep() {
    this.sequence.push({ play: false, value: null });
  }

  removeStep() {
    this.sequence.pop();
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
        console.log(this.sequence);
      }
      if (setting === 'speed') {
        this.speed = 1 / this.settings.speed;
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
