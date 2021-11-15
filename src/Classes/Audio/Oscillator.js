import audio from './Audio';

export default class Oscillator {
  constructor(type = 'sawtooth', frequency = 440) {
    this.audio = audio;
    this.node = audio.context.createOscillator();
    this.node.type = type;
    this.node.frequency.setValueAtTime(frequency, audio.context.currentTime);
    this.node.start();
  }
  connectTo(output) {
    this.node.connect(output.node);
  }
  disconnectFrom(output) {
    this.node.disconnect(output.node);
  }
  setFrequency(freq) {
    this.node.frequency.setValueAtTime(freq, audio.context.currentTime);
  }
  setDetune(cent) {
    this.node.detune.setValueAtTime(cent, audio.context.currentTime);
  }
  setType(type) {
    this.node.type = type;
  }
}
