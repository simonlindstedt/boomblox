let notes = [];
let noteNames = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

for (let i = 0; i < 12; i++) {
  let note = { name: noteNames[i], freq: 440 * Math.pow(2, (i - 9) / 12) };
  notes.push(note);
}

export default notes;
