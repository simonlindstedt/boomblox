import audio from './Audio';

export default class Master {
  constructor() {
    this.audio = audio;

    //limiter
    this.node = audio.context.createDynamicsCompressor();
    this.node.threshold.setValueAtTime(-50, audio.context.currentTime);

    // output
    this.output = audio.context.createGain();
    this.output.gain.setValueAtTime(0, audio.context.currentTime);

    //connect
    this.node.connect(this.output);
    this.output.connect(audio.context.destination);
  }
  setVolume(value) {
    this.output.gain.setValueAtTime(value, audio.context.currentTime);
  }
}
