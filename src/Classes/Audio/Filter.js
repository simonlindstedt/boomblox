import audio from "./Audio";

export default class Filter {
  constructor(type = "lowpass", freq = 6000) {
    this.audio = audio;
    this.filter = audio.context.createBiquadFilter();
    this.filter.type = type;
    this.filter.frequency.setValueAtTime(freq, audio.context.currentTime);
  }
}
