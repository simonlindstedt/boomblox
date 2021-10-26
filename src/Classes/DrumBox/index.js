import Audio from "../Audio/Audio";
import BasicBox from "../BasicBox";

export default class DrumBox extends BasicBox {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.init();
  }
}
