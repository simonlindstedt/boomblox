import audio from "./Audio";

export default class Master {
  constructor() {
    this.audio = audio;
    this.node = audio.context.createGain();
    this.node.connect(audio.context.destination);
    this.node.gain.setValueAtTime(0, audio.context.currentTime);
  }
  setVolume(value) {
    this.node.gain.setValueAtTime(value, audio.context.currentTime);
  }
}
