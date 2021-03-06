import { Graphics } from '@pixi/graphics';
import audio from '../../Audio/Audio';

export default class Visualizer {
  constructor() {
    this.audioContext = audio.context;
    this.microphoneStream;
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 512;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.graphics = new Graphics();
  }

  createMediaStreamSourceAndConnectToAnalyser(stream) {
    this.microphoneStream = this.audioContext.createMediaStreamSource(stream);
    this.microphoneStream.connect(this.analyser);
  }

  draw(w, isMasterBox) {
    this.analyser.getByteTimeDomainData(this.dataArray);

    this.graphics.clear();
    this.graphics.lineStyle(2, 0xa3c3d1);

    let sliceWidth = w / this.bufferLength;
    let x = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      let v = this.dataArray[i] / 128.0;

      let y;

      if (isMasterBox) {
        y = (v * w) / 1.5;
      } else {
        y = (v * w) / 2;
      }

      if (i === 0) {
        this.graphics.moveTo(x, y);
      } else {
        this.graphics.lineTo(x, y);
      }
      x += sliceWidth;
    }
  }

  stop(w) {
    this.graphics.clear();
    this.graphics.lineStyle(2, 0xa3c3d1);

    this.graphics.moveTo(0, w / 2);
    this.graphics.lineTo(w, w / 2);
  }
}
