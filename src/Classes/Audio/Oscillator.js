import audio from "./Audio";

export default class Oscillator {
  constructor(type, frequency) {
    this.audio = audio;
    this.node = audio.context.createOscillator();
    this.node.type = type;
    this.node.frequency.setValueAtTime(frequency, audio.context.currentTime);
    this.node.start();
  }
  connectTo(gain) {
    this.node.connect(gain.node);
  }
  disconnectFrom(gain) {
    this.node.disconnect(gain.node);
  }
}
