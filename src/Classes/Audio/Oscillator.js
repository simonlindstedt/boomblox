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
  }
  connectTo(gain) {
    this.audioNode.connect(gain.volume);
    this.audioNode.start();
  }
}
