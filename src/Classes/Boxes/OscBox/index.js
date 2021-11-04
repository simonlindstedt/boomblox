import Oscillator from "../../Audio/Oscillator";
import Gain from "../../Audio/Gain";
import BasicBox from "../BasicBox";

export default class OscBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings) {
    super(x, y, w, h, mediator, settings);
    this.type = "osc";
    this.canConnect = ["master", "filter", "reverb"];
    this.input = new Oscillator(settings.type, settings.freq);
    this.output = new Gain();
    this.init();
  }

  connectTo(box) {
    this.addToConnectionList(box);
    this.output.connectTo(box.input);
  }

  disconnectFrom(box) {
    this.connections = this.connections.filter((item) => item.id !== box.id);
    this.output.disconnectFrom(box.input);
  }

  changeSettings(settings) {
    this.settings = settings;
    Object.keys(this.settings).forEach((setting) => {
      if (setting === "volume") {
        this.output.setVolume(this.settings.volume);
      }
      if (setting === "freq") {
        this.input.setFrequency(this.settings.freq);
      }
    });
  }
}
