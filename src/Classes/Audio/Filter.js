import audio from './Audio';

export default class Filter {
  constructor(type = 'lowpass', freq = 200) {
    this.audio = audio;
    this.node = audio.context.createBiquadFilter();
    this.node.type = type;
    this.node.frequency.setValueAtTime(freq, audio.context.currentTime);
  }
  connectTo(output) {
    this.node.connect(output.node);
  }
  disconnectFrom(output) {
    this.node.disconnect(output.node);
  }
  setFrequency(freq) {
    // this.node.frequency.setValueAtTime(freq, audio.context.currentTime);
    this.node.frequency.linearRampToValueAtTime(
      freq,
      audio.context.currentTime + 0.1
    );
  }

  setType(type) {
    this.node.type = type;
  }
}
