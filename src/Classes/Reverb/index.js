import BasicBox from '../BasicBox';
import audio from '../Audio/Audio';
import impulse from './sound/ir.wav';

export default class ReverbBox extends BasicBox {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.audioContext = audio.context;
    this.master = audio.master;
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
  }
  connectTo(box) {
    this.connection.isConnected = true;
    this.connection.boxId = box.id;
    this.connection.boxPosition = box.position;
    box.connection.isConnected = true;
    this.graphics.cube.tint = 0xfff000;
    box.audioNode.volume.connect(this.convolver).connect(this.master);
  }
  disconnectFrom(box) {
    this.connection.isConnected = false;
    this.connection.boxId = null;
    this.connection.boxPosition = { x: undefined, y: undefined };
    this.graphics.cube.tint = 0xffffff;
    box.connection.isConnected = false;
    // this.convolver.disconnect(box.audioNode.volume);
    box.audioNode.volume.disconnect(this.convolver);
    this.convolver.disconnect(this.master);
    // box.audioNode.volume
    //   .disconnect(this.convolver)
    //   .disconnect(this.audioContext.destination);
  }
}
