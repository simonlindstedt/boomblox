import audio from "./Audio";

export default class Gain {
  constructor() {
    this.audio = audio;
    this.volume = audio.context.createGain();
    this.volume.connect(audio.master);
    this.volume.gain.setValueAtTime(0, audio.context.currentTime);
  }
  setVolume(value) {
    this.volume.gain.setValueAtTime(value, audio.context.currentTime);
  }
}
