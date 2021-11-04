self.addEventListener("message", (e) => {
  if (e.data.boxSettings) {
    postMessage({ boxSettings: e.data.boxSettings });
  }
});
