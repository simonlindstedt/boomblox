import Gain from "../Audio/Gain";
import BasicBox from "../BasicBox";

export default class GainBox extends BasicBox {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.connection = { isConnected: false };
    this.gain = new Gain();
  }
}
