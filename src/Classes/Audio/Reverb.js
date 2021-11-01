import audio from './Audio';

export default class Reverb {
  constructor(reverbSound) {
    this.audio = audio;
    this.node;
    this.sound = reverbSound;
    this.setup();
  }

  getImpulseBuffer = () => {
    return fetch(this.sound)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => this.audio.context.decodeAudioData(arrayBuffer));
  };

  async setup() {
    this.node = this.audio.context.createConvolver();
    this.node.buffer = await this.getImpulseBuffer();
  }
}
