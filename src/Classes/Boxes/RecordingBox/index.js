import { Sprite } from "@pixi/sprite";
import BasicBox from "../BasicBox";
import recordButton from "./images/record.png";
import stopButton from "./images/stop.png";
import Visualizer from "../Visualizer";
import audio from "../../Audio/Audio";
import Gain from "../../Audio/Gain";

export default class RecordingBox extends BasicBox {
  constructor(x, y, w, h, mediator, settings) {
    super(x, y, w, h, mediator, settings);
    this.type = 'rec';
    this.canConnect = ['master', 'reverb', 'filter', 'delay'];
    this.input;
    this.output = new Gain();
    this.dimensions = { w, h };

    this.visualizer = new Visualizer();
    this.graphics = {
      ...this.graphics,
      recordBtn: new Sprite.from(recordButton),
      stopBtn: new Sprite.from(stopButton),
      visualizer: this.visualizer.graphics,
    };
    this.graphics.recordBtn.anchor.set(1);
    this.graphics.stopBtn.anchor.set(1);
    this.graphics.recordBtn.width = this.dimensions.w / 4;
    this.graphics.recordBtn.height = this.dimensions.h / 4;
    this.graphics.stopBtn.width = this.dimensions.w / 4;
    this.graphics.stopBtn.height = this.dimensions.h / 4;

    this.graphics.recordBtn.x =
      this.dimensions.w / 2 + this.graphics.recordBtn.width / 2;
    this.graphics.recordBtn.y = this.dimensions.h - this.dimensions.h / 10;
    this.graphics.stopBtn.x =
      this.dimensions.w / 2 + this.graphics.stopBtn.width / 2;
    this.graphics.stopBtn.y = this.dimensions.h - this.dimensions.h / 10;

    this.graphics.recordBtn.interactive = true;
    this.graphics.stopBtn.interactive = false;

    this.graphics.stopBtn.alpha = 0;
    this.recording = false;
    this.init();
    this.recordSound();
  }

  visualize() {
    if (this.recording) {
      this.visualizer.draw(this.dimensions.w, false);
    } else {
      this.visualizer.stop(this.dimensions.w);
    }
  }

  recordSound() {
    if (navigator.mediaDevices.getUserMedia) {
      const constraints = { audio: true };

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        let chunks = [];
        this.visualizer.createMediaStreamSourceAndConnectToAnalyser(stream);

        this.graphics.recordBtn.on("mousedown", (e) => {
          mediaRecorder.start();
          this.recording = true;
          this.graphics.stopBtn.interactive = true;
          this.graphics.recordBtn.interactive = false;
          this.graphics.recordBtn.alpha = 0;
          this.graphics.stopBtn.alpha = 1;
        });

        this.graphics.stopBtn.on("mousedown", (e) => {
          this.recording = false;
          mediaRecorder.stop();
          this.graphics.stopBtn.interactive = false;
          this.graphics.stopBtn.cursor = 'default';
          this.graphics.recordBtn.alpha = 0;
        });

        mediaRecorder.onstop = function (e) {
          const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
          chunks = [];
          const audioURL = window.URL.createObjectURL(blob);

          playSound(audioURL);
        };

        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        };

        const playSound = async (audioURL) => {
          const audioContext = audio.context;
          this.input = audioContext.createBufferSource();
          const audioBuffer = await fetch(audioURL)
            .then((res) => res.arrayBuffer())
            .then((ArrayBuffer) => audioContext.decodeAudioData(ArrayBuffer));

          this.input.buffer = audioBuffer;
          this.input.start();
          this.input.loop = true;

          this.output.setVolume(this.settings.volume);
          this.input.connect(this.output.node);
        };
      }, this.onError);
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }

  onError(err) {
    console.log("The following error occured: " + err);
  }

  connectTo(box) {
    if (this.input != undefined) {
      this.addToConnectionList(box);
      this.output.node.connect(box.input.node);
    }
  }

  disconnectFrom(box) {
    if (this.input != undefined) {
      this.connections = this.connections.filter((item) => item.id !== box.id);
      this.output.node.disconnect(box.input.node);
    }
  }

  changeSettings(settings) {
    this.settings = settings;
    Object.keys(this.settings).forEach((setting) => {
      if (setting === "volume") {
        this.output.setVolume(this.settings.volume);
      }
    });
  }
}
