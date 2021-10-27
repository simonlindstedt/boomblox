import BasicBox from '../BasicBox';
import audio from '../Audio/Audio';

export default class ReverbBox extends BasicBox {
  constructor(x, y, w, h, reverbTime) {
    super(x, y, w, h);
    this.effect = audio.context.createConvolver();
    this.reverbTime = reverbTime;
    this.attack = 0;
    this.decay = 0.0;
    this.release = reverbTime / 3;

    this.preDelay = audio.context.createDelay(this.reverbTime);
    this.preDelay.delayTime.setValueAtTime(
      this.preDelay,
      audio.context.currentTime
    );
    this.multitap = [];
    for (let i = 2; i > 0; i--) {
      this.multitap.push(this.context.createDelay(this.reverbTime));
    }
    this.multitap.map((t, i) => {
      if (this.multitap[i + 1]) {
        t.connect(this.multitap[i + 1]);
      }
      t.delayTime.setValueAtTime(
        0.001 + i * (this.preDelay / 2),
        this.context.currentTime
      );
    });
    this.multitapGain = audio.context.createGain();
    this.multitap[this.multitap.length - 1].connect(this.multitapGain);
    this.multitapGain.gain.value = 0.2;

    this.multitapGain.connect(audio.context.destination);
    this.wet = this.context.createGain();

    this.input.connect(this.wet);
    this.wet.connect(this.preDelay);
    this.wet.connect(this.multitap[0]);
    this.preDelay.connect(this.effect);
    this.effect.connect(this.output);

    this.renderTail();
  }

  renderTail() {
    const tailContext = new OfflineAudioContext(
      2,
      audio.context.sampleRate * this.reverbTime,
      audio.context.sampleRate
    );
    const tailOsc = new Noise(tailContext, 1);
    const tailLPFilter = new Filter(tailContext, 'lowpass', 5000, 1);
    const tailHPFilter = new Filter(tailContext, 'highpass', 500, 1);

    tailOsc.init();
    tailOsc.connect(tailHPFilter.input);
    tailHPFilter.connect(tailLPFilter.input);
    tailLPFilter.connect(tailContext.destination);
    tailOsc.attack = this.attack;
    tailOsc.decay = this.decay;
    tailOsc.release = this.release;

    setTimeout(() => {
      tailContext.startRendering().then((buffer) => {
        this.effect.buffer = buffer;
      });

      tailOsc.on({ frequency: 500, velocity: 127 });
      tailOsc.off();
    }, 20);
  }
  setup() {}

  connectTo(box) {}
}
