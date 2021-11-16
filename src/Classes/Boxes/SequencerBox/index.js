import BasicBox from '../BasicBox';
import Sequencer from '../../Audio/Sequencer';

export default class SequencerBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings) {
    super(x, y, w, h, mediator, settings);
    this.sequencer = new Sequencer(this.settings.speed, this.settings.sequence);
    this.sequencer.id = this.id;
    this.type = 'seq';
    this.canConnect = ['osc', 'drum'];
    this.init();
  }

  play() {
    return this.sequencer.play();
  }

  changeSettings(settings) {
    this.settings = settings;
    Object.keys(this.settings).forEach((setting) => {
      if (setting === 'sequence') {
        this.sequencer.sequence = this.settings.sequence;
      }
      if (setting === 'speed') {
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
