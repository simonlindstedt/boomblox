export default class Audio {
  constructor() {
    this.context = new AudioContext();
    this.master = this.context.createGain();
    this.master.gain.setValueAtTime(0.3, this.context.currentTime);
    this.init();
  }
  init() {
    this.master.connect(this.context.destination);
  }
  play() {
    this.context.resume();
  }
}
