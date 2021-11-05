import audio from "./Audio";

export default class FrequencyLfo {
  constructor(rate, type, maxValue) {
    this.audio = audio;
    this.input = audio.context.createOscillator();
    this.input.type = type;
    this.output = audio.context.createGain();
    this.setRate(rate);
    this.setMaxValue(maxValue);
    this.input.connect(this.output);
    this.input.start();
  }

  connectTo(input) {
    this.output.connect(input.node.frequency);
  }
  disconnectFrom(input) {
    this.output.disconnect(input.node.frequency);
  }

  setRate(rate) {
    this.input.frequency.setValueAtTime(rate, audio.context.currentTime);
  }

  setMaxValue(maxValue) {
    this.output.gain.setValueAtTime(maxValue, audio.context.currentTime);
  }
}
