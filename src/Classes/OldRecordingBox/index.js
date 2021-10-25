import { Graphics } from '@pixi/graphics';
import { Sound } from '@pixi/sound';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import recordButton from '../../assets/images/record.png';
import stopButton from '../../assets/images/pause.png';
import Visualizer from '../Visualizer';
import { Texture } from '@pixi/core';

export default class RecordingBox {
  constructor(x, y, audioContext) {
    this.container = new Container();
    this.audioContext = audioContext;
    this.visualizer = new Visualizer(this.audioContext);

    this.graphics = {
      cube: new Sprite(),
      recordBtn: new Sprite.from(recordButton),
      stopBtn: new Sprite.from(stopButton),
      visualizer: this.visualizer.graphics,
    };
    this.graphics.cube.texture = Texture.WHITE;
    this.graphics.cube.width = 100;
    this.graphics.cube.height = 100;
    this.graphics.cube.radius = 20;

    this.graphics.recordBtn.anchor.set(0.5);
    this.graphics.stopBtn.anchor.set(0.5);

    this.graphics.recordBtn.x = 20;
    this.graphics.recordBtn.y = 75;
    this.graphics.stopBtn.x = 75;
    this.graphics.stopBtn.y = 75;

    this.container.x = x;
    this.container.y = y;
    this.container.interactive = true;
    this.container.dragging = false;
    this.recording = false;

    this.graphics.recordBtn.interactive = true;
    this.graphics.stopBtn.interactive = true;

    this.recordSound();
    this.setUpEvents();
  }

  draw() {
    Object.keys(this.graphics).forEach((key) => {
      this.container.addChild(this.graphics[key]);
    });

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
        this.visualizer.createMediaStream(stream);

        this.graphics.recordBtn.on('mousedown', (e) => {
          mediaRecorder.start();
          this.recording = true;
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

          const sound = Sound.from(audioURL);
          sound.play({ loop: true });
        };

        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        };
      }, this.onError);
    } else {
      console.log('getUserMedia not supported on your browser!');
    }
  }

  onError(err) {
    console.log('The following error occured: ' + err);
  }
  setUpEvents() {
    this.container.on('mousedown', (e) => {
      this.container.x = e.data.global.x - 50;
      this.container.y = e.data.global.y - 50;
      this.container.dragging = true;
      console.log('picked up');
    });

    this.container.on('mousemove', (e) => {
      if (this.container.dragging) {
        console.log('dragging');
        this.container.x = e.data.global.x - 50;
        this.container.y = e.data.global.y - 50;
      }
    });

    this.container.on('mouseup', (e) => {
      console.log('dropped');
      this.container.x = e.data.global.x - 50;
      this.container.y = e.data.global.y - 50;
      this.container.dragging = false;
    });
  }
}
