import audio from "./Audio";

export default class LFO {
  constructor(freq, type, maxValue) {
    this.audio = audio;
    this.input = audio.context.createOscillator();
    this.input.type = type;
    this.output = audio.context.createGain();
    this.output.gain.setValueAtTime(maxValue, audio.context.currentTime);
    this.input.frequency.setValueAtTime(freq, audio.context.currentTime);
    this.input.connect(this.output);
    this.input.start();
  }

  connectTo(input) {
    this.output.connect(input.node.frequency);
  }
  disconnectFrom(input) {
    this.output.disconnect(input.node.frequency);
  }

  setFrequency(freq) {
    this.input.frequency.setValueAtTime(freq, audio.context.currentTime);
  }

  setMaxValue(maxValue) {
    this.output.gain.setValueAtTime(maxValue, audio.context.currentTime);
  }
}
