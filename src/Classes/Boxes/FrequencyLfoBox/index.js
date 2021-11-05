import FrequencyLfo from "../../Audio/FrequencyLfo";
import BasicBox from "../BasicBox";

export default class FrequencyLfoBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings) {
    super(x, y, w, h, mediator, settings);
    this.type = "frequency-lfo";
    this.canConnect = ["osc", "filter"];
    this.lfo = new FrequencyLfo(
      settings.rate,
      settings.type,
      settings.maxValue
    );
    this.init();
  }

  connectTo(box) {
    this.addToConnectionList(box);
    this.lfo.connectTo(box.input);
  }

  disconnectFrom(box) {
    this.connections = this.connections.filter((item) => item.id !== box.id);
    this.lfo.disconnectFrom(box.input);
  }

  changeSettings(settings) {
    this.settings = settings;
    Object.keys(this.settings).forEach((setting) => {
      if (setting === "rate") {
        this.lfo.setRate(this.settings.rate);
      }
      if (setting === "maxValue") {
        this.lfo.setMaxValue(this.settings.maxValue);
      }
    });
  }
}
