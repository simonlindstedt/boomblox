import audio from './Audio';

export default class Delay {
  constructor(time = 100, feedback = 0.1) {
    this.audio = audio;
    this.node = audio.context.createDelay();
    this.feedback = audio.context.createGain();
    this.setDelayTime(time);
    this.setFeedback(feedback);
    this.node.connect(this.feedback);
    this.feedback.connect(this.node);
  }

  connectTo(output) {
    this.node.connect(output.node);
  }

  disconnectFrom(output) {
    this.node.disconnect(output.node);
  }

  setDelayTime(time) {
    time /= 1000;
    this.node.delayTime.linearRampToValueAtTime(
      time,
      audio.context.currentTime + 0.1
    );
  }
  setFeedback(feedback) {
    feedback > 1 ? (feedback = 1) : feedback;
    // this.feedback.gain.setValueAtTime(feedback, audio.context.currentTime);
    this.feedback.gain.linearRampToValueAtTime(
      feedback,
      audio.context.currentTime + 0.1
    );
  }
}
