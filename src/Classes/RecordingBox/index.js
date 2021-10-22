import { Graphics } from "@pixi/graphics";
import { Sound } from "@pixi/sound";
import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import recordButton from "../../assets/images/record.png";
import stopButton from "../../assets/images/stop.png";
import Visualizer from "../Visualizer";

export default class RecordingBox {
  constructor(x, y, audioContext) {
    this.container = new Container();
    this.graphics = new Graphics();
    this.recordBtn = Sprite.from(recordButton);
    this.stopBtn = Sprite.from(stopButton);
    this.container.x = x;
    this.container.y = y;
    this.audioContext = audioContext;
    this.container.interactive = true;
    this.recordBtn.interactive = true;
    this.stopBtn.interactive = true;
    this.container.dragging = false;
    this.visualizer = new Visualizer(this.audioContext);
    this.recordSound(this.recordBtn, this.stopBtn, this.audioContext);
    this.setUpEvents();
    this.recording = false;
  }

  draw() {
    this.recordBtn.anchor.set(0.5);
    this.stopBtn.anchor.set(0.5);

    this.graphics.clear();
    this.graphics.beginFill(0xffffff);
    this.graphics.drawRect(0, 0, 100, 100);

    this.recordBtn.x = 20;
    this.recordBtn.y = 80;
    this.stopBtn.x = 80;
    this.stopBtn.y = 80;

    this.container.addChild(
      this.graphics,
      this.visualizer.graphics,
      this.stopBtn,
      this.recordBtn
    );

    if (this.recording) {
      this.visualizer.draw();
    }
  }

  recordSound() {
    if (navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");

      const constraints = { audio: true };

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        let chunks = [];
        this.visualizer.createMediaStream(stream);

        this.recordBtn.on("mousedown", (e) => {
          mediaRecorder.start();
          this.recording = true;
          console.log(mediaRecorder.state);
          console.log("recorder started");
        });

        this.stopBtn.on("mousedown", (e) => {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
          console.log("recorder stopped");
        });

        mediaRecorder.onstop = function (e) {
          console.log("data available after MediaRecorder.stop() called.");

          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          chunks = [];
          const audioURL = window.URL.createObjectURL(blob);
          console.log("recorder stopped");

          const sound = Sound.from(audioURL);
          sound.play({ loop: true });
        };

        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        };
      }, this.onError);
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }

  onError(err) {
    console.log("The following error occured: " + err);
  }
  setUpEvents() {
    this.container.on("mousedown", (e) => {
      this.container.x = e.data.global.x - 50;
      this.container.y = e.data.global.y - 50;
      this.container.dragging = true;
      console.log("picked up");
    });

    this.container.on("mousemove", (e) => {
      if (this.container.dragging) {
        console.log("dragging");
        this.container.x = e.data.global.x - 50;
        this.container.y = e.data.global.y - 50;
      }
    });

    this.container.on("mouseup", (e) => {
      console.log("dropped");
      this.container.x = e.data.global.x - 50;
      this.container.y = e.data.global.y - 50;
      this.container.dragging = false;
    });
  }
}
