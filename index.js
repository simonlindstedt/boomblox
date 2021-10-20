import Gain from "./src/Classes/Audio/Gain";
import Oscillator from "./src/Classes/Audio/Oscillator";
import Mixer from "./src/Classes/Audio/Mixer";

const mixer = new Mixer();

for (let i = 0; i < 25; i++) {
  let osc = new Oscillator("sawtooth", Math.random() * 1000);
  let gain = new Gain();
  osc.connectTo(gain);
  gain.setVolume(0.2);
  mixer.addToList(osc, gain);
}
