export default class Sequencer {
  constructor(speed, sequence = []) {
    this.sequence = sequence;
    this.count = 0;
    this.currentStep = 0;
    this.connections = [];
    this.speed = speed;
  }

  play() {
    this.currentStep = this.count++ % this.sequence.length;
    return this.sequence[this.currentStep];
  }

  connectTo(box) {
    this.connections.push(box);
  }
  disconnectFrom(box) {
    this.connections.filter((item) => item.id !== box.id);
  }
}
