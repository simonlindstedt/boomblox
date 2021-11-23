import audio from './Audio';

export default class Oscillator {
  constructor(type = 'sawtooth', frequency = 440, glide) {
    this.audio = audio;
    this.node = audio.context.createOscillator();
    this.node.type = type;
    this.node.frequency.setValueAtTime(frequency, audio.context.currentTime);
    this.node.start();
    this.glide = glide;
  }
  connectTo(output) {
    this.node.connect(output.node);
  }
  disconnectFrom(output) {
    this.node.disconnect(output.node);
  }
  setFrequency(freq) {
    if (this.glide) {
      this.node.frequency.linearRampToValueAtTime(
        freq,
        audio.context.currentTime + 0.1
      );
    } else {
      this.node.frequency.setValueAtTime(freq, audio.context.currentTime);
    }
  }
  setDetune(cent) {
    // this.node.detune.setValueAtTime(cent, audio.context.currentTime);
    this.node.detune.setValueAtTime(cent, audio.context.currentTime + 0.1);
  }
  setType(type) {
    this.node.type = type;
  }
}
