self.addEventListener("message", (e) => {
  if (e.data.box) {
    postMessage({ box: e.data.box });
  }
  if (e.data.sequencerStates) {
    postMessage({ sequencerStates: e.data.sequencerStates });
  }
});
