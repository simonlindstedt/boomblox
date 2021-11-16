import BasicBox from '../BasicBox';
import Sequencer from '../../Audio/Sequencer';

export default class SequencerBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings) {
    super(x, y, w, h, mediator, settings);
    this.sequencer = new Sequencer(this.settings.speed, this.settings.sequence);
    this.sequencer.id = this.id;
    this.type = 'seq';
    this.canConnect = ['osc', 'drum'];
    // this.sequence = this.settings.sequence;
    // this.count = 0;
    // this.currentStep = 0;
    // this.speed = this.settings.speed;
    this.init();
  }

  play() {
    // this.currentStep = this.count++ % this.sequence.length;
    return this.sequencer.play();
  }

  changeSettings(settings) {
    this.settings = settings;
    Object.keys(this.settings).forEach((setting) => {
      if (setting === 'sequence') {
        // this.sequence = this.settings.sequence;
        this.sequencer.sequence = this.settings.sequence;
      }
      if (setting === 'speed') {
        // this.speed = this.settings.speed;
        this.sequencer.speed = this.settings.speed;
      }
      if (setting === 'currentStep') {
        this.sequencer.setCurrentStep(this.settings.currentStep);
      }
    });
  }

  connectTo(box) {
    this.addToConnectionList(box);
    this.sequencer.connectTo(box);
  }

  disconnectFrom(box) {
    this.connections = this.connections.filter((item) => item.id !== box.id);
    this.sequencer.disconnectFrom(box);
  }
}
