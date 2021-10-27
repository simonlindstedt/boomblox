import audio from "./Audio";

export default class Oscillator {
  constructor(type, frequency) {
    this.audio = audio;
    this.audioNode = audio.context.createOscillator();
    this.audioNode.type = type;
    this.audioNode.frequency.setValueAtTime(
      frequency,
      audio.context.currentTime
    );
    this.audioNode.start();
  }
  connectTo(gain) {
    this.audioNode.connect(gain.volume);
  }
  disconnectFrom(gain) {
    this.audioNode.disconnect(gain.volume);
  }
}
