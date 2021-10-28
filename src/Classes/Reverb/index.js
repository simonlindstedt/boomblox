import BasicBox from '../BasicBox';
import audio from '../Audio/Audio';
import impulse from './sound/ir.wav';

export default class ReverbBox extends BasicBox {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.audioContext = audio.context;
    this.convolver;
    this.canConnect = ['gain'];
    this.setup();
    this.init();
  }

  getImpulseBuffer = () => {
    return fetch(impulse)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => this.audioContext.decodeAudioData(arrayBuffer));
  };

  async setup() {
    this.convolver = this.audioContext.createConvolver();
    this.convolver.buffer = await this.getImpulseBuffer();
    console.log(this.convolver);
  }
  connectTo(box) {
    box.audioNode.volume
      .connect(this.convolver)
      .connect(this.audioContext.destination);
  }
  disconnectFrom(box) {
    box.graphics.cube.tint = 0xffffff;
    box.audioNode.volume
      .disconnect(this.convolver)
      .disconnect(this.audioContext.destination);
  }
}
