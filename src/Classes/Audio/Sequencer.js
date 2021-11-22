export default class Sequencer {
  constructor(speed, sequence = []) {
    this.sequence = sequence;
    this.id = Math.random().toString(36).substr(2);
    this.belongsTo = null;
    this.count = 0;
    this.currentStep = 0;
    this.connections = [];
    this.speed = speed;
  }

  play() {
    this.currentStep = this.count++ % this.sequence.length;
    return this.sequence[this.currentStep];
  }

  reset() {
    this.count = 0;
  }

  connectTo(box) {
    this.connections.push(box);
  }
  disconnectFrom(box) {
    this.connections.filter((item) => item.id !== box.id);
  }
}
