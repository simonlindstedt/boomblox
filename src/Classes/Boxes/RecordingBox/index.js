import { Sprite } from '@pixi/sprite';
import BasicBox from '../BasicBox';
import recordButton from './images/record.png';
import stopButton from './images/pause.png';
import Visualizer from '../Visualizer';
import audio from '../../Audio/Audio';

export default class RecordingBox extends BasicBox {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.type = 'rec';
    this.canConnect = ['gain'];
    this.audioNode;

    this.visualizer = new Visualizer();
    this.graphics = {
      ...this.graphics,
      recordBtn: new Sprite.from(recordButton),
      stopBtn: new Sprite.from(stopButton),
      visualizer: this.visualizer.graphics,
    };
    this.graphics.recordBtn.anchor.set(0.5);
    this.graphics.stopBtn.anchor.set(0.5);

    this.graphics.recordBtn.x = 20;
    this.graphics.recordBtn.y = 75;
    this.graphics.stopBtn.x = 75;
    this.graphics.stopBtn.y = 75;

    this.graphics.recordBtn.interactive = true;
    this.graphics.stopBtn.interactive = false;

    this.recording = false;
    this.init();
    this.recordSound();
  }

  visualize() {
    if (this.recording) {
      this.visualizer.draw();
    } else {
      this.visualizer.stop();
    }
  }

  recordSound() {
    if (navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');

      const constraints = { audio: true };

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        let chunks = [];
        this.visualizer.createMediaStreamSourceAndConnectToAnalyser(stream);

        this.graphics.recordBtn.on('mousedown', (e) => {
          mediaRecorder.start();
          this.recording = true;
          this.graphics.stopBtn.interactive = true;
          console.log(mediaRecorder.state);
          console.log('recorder started');
        });

        this.graphics.stopBtn.on('mousedown', (e) => {
          this.recording = false;
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
          console.log('recorder stopped');
        });

        mediaRecorder.onstop = function (e) {
          console.log('data available after MediaRecorder.stop() called.');

          const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
          chunks = [];
          const audioURL = window.URL.createObjectURL(blob);

          console.log('recorder stopped');

          playSound(audioURL);
        };

        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        };

        const playSound = async (audioURL) => {
          const audioContext = audio.context;
          this.audioNode = audioContext.createBufferSource();
          const audioBuffer = await fetch(audioURL)
            .then((res) => res.arrayBuffer())
            .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));

          this.audioNode.buffer = audioBuffer;
          this.audioNode.start();
          this.audioNode.loop = true;
        };
      }, this.onError);
    } else {
      console.log('getUserMedia not supported on your browser!');
    }
  }

  onError(err) {
    console.log('The following error occured: ' + err);
  }

  connectTo(box) {
    if (this.audioNode != undefined) {
      this.connections.push({ id: box.id, position: box.position });
      this.audioNode.connect(box.audioNode.node);
    }
  }

  disconnectFrom(box) {
    if (this.audioNode != undefined) {
      this.connections = this.connections.filter((item) => item.id !== box.id);
      this.audioNode.disconnect(box.audioNode.node);
    }
  }
}
