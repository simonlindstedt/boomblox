import audio from "./Audio";

export default class Gain {
  constructor() {
    this.audio = audio;
    this.node = audio.context.createGain();
    this.node.gain.setValueAtTime(0, audio.context.currentTime);
  }
  setVolume(value) {
    this.node.gain.setValueAtTime(value, audio.context.currentTime);
  }
  connectTo(output) {
    this.node.connect(output.node);
  }
  disconnectFrom(output) {
    this.node.disconnect(output.node);
  }
}
