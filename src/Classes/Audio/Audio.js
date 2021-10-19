const context = new AudioContext();
const master = context.createGain();
master.gain.setValueAtTime(0.5, context.currentTime);
master.connect(context.destination);
context.resume();

export default { context, master };
