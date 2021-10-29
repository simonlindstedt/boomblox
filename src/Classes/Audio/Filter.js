import audio from "./Audio";

export default class Filter {
  constructor(type = "lowpass", freq = 200) {
    this.audio = audio;
    this.node = audio.context.createBiquadFilter();
    this.node.type = type;
    this.node.frequency.setValueAtTime(freq, audio.context.currentTime);
  }
}
