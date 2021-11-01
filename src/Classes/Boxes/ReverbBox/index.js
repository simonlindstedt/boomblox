import BasicBox from '../BasicBox';
import audio from '../../Audio/Audio';
import impulse from './sound/ir.wav';
import Reverb from '../../Audio/Reverb';

export default class ReverbBox extends BasicBox {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.audioContext = audio.context;
    this.type = 'reverb';
    this.audioNode = new Reverb(impulse);
    this.canConnect = ['gain', 'master'];
    this.init();
  }

  connectTo(box) {
    this.connections.push({ id: box.id, position: box.position });
    this.audioNode.node.connect(box.audioNode.node);
  }
  disconnectFrom(box) {
    this.connections = this.connections.filter((item) => item.id !== box.id);
    this.audioNode.node.disconnect(box.audioNode.node);
  }
}
