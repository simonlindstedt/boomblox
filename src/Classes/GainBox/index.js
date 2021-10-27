import Gain from "../Audio/Gain";
import BasicBox from "../BasicBox";

export default class GainBox extends BasicBox {
  constructor(x, y, w, h, volume = 0.2) {
    super(x, y, w, h);
    this.type = "gain";
    this.audioNode = new Gain();
    this.audioNode.setVolume(volume);
    this.init();
  }
}
