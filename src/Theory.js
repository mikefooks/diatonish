import { List, Map } from "immutable";


const noteList = [
  ["B#", "C", null],
  ["C#", null, "Db"],
  [null, "D", null],
  ["D#", null, "Eb"],
  [null, "E", "Fb"],
  ["E#", "F", null],
  ["F#", null, "Gb"],
  [null, "G", null],
  ["G#", null, "Ab"],
  [null, "A", null],
  ["A#", null, "Bb"],
  [null, "B", "Cb"]
];                                                          

const keySignatures = [
  { root: 0, 
    sig: [0, 2, 4, 5, 7, 9, 11],
    names: [ "C", "D", "E", "F", "G", "A", "B" ] },
  { root: 7,
    sig: [0, 2, 4, 6, 7, 9, 11],
    names: ["C", "D", "E", "F#", "G", "A", "B"] }, // G major / E minor (1 sharp)
  { root: 2,
    sig: [1, 2, 4, 6, 7, 9, 11],
    names: [ "C#", "D", "E", "F#", "G", "A", "B" ] }, // D major / B minor (2 sharps)
  { root: 9,
    sig: [1, 2, 4, 6, 8, 9, 11],
    names: [ "C#", "D", "E", "F#", "G#", "A", "B" ] }, // A major / F# minor (3 sharps)
  { root: 4,
    sig: [1, 3, 4, 6, 8, 9, 11],
    names: [ "C#", "D#", "E", "F#", "G#", "A", "B" ] }, // E major / C# minor (4 sharps)
  /*
  the following three key signatures could be interpreted differently depending
  on the context and the composer/player's purposes and whims.
  */
  { root: 11,
    sig: [1, 3, 4, 6, 8, 10, 11],
    names: [ "C#", "D#", "E", "F#", "G#", "A#", "B" ] }, // B major / G# minor (5 sharps)
  { root: 6,
    sig: [1, 3, 5, 6, 8, 10, 11],
    names: [ "Db", "Eb", "F", "Gb", "Ab", "Bb", "Cb" ] }, // Gb major / Eb minor (6 flats)
  { root: 1,
    sig: [0, 1, 3, 5, 6, 8, 10],
    names: [ "C", "Db", "Eb", "F", "Gb", "Ab", "Bb" ] }, // Db Major / Bb minor (5 flats)
  /**/
  { root: 8,
    sig: [0, 1, 3, 5, 7, 8, 10],
    names: [ "C", "Db", "Eb", "F", "G", "Ab", "Bb" ] }, // Ab major / F minor (4 flats)
  { root: 3,
    sig: [0, 2, 3, 5, 7, 8, 10],
    names: [ "C", "D", "Eb", "F", "G", "Ab", "Bb" ] }, // Eb major / C minor (3 flats)
  { root: 10,
    sig: [0, 2, 3, 5, 7, 9, 10],
    names: [ "C", "D", "Eb", "F", "G", "A", "Bb" ] }, // Bb major / G minor (2 flats)
  { root: 5,
    sig: [0, 2, 4, 5, 7, 9, 10],
    names: [ "C", "D", "E", "F", "G", "A", "Bb" ]} // F major / D minor (1 flat)
];

// need a function (root, modeIdx) that outputs the correct key signature
// from above.

const modeAdditions = [
  0, 2, 4, 5, 7, 9, 11 
];

function getModeAdjustedSignature(root, modeIdx) {
  let adjustedRoot = Math.abs((root - modeAdditions[modeIdx])); // % 12?
  return keySignatures.find(item => item.root == adjustedRoot);
}

const circleOfFifths = List.of(
  0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5 
);

const modeNames = List.of(
  "Ionian",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Aeolian",
  "Locrian"  
);

const modeFormulas = List([
  [2, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 2, 2, 1, 2],
  [1, 2, 2, 2, 1, 2, 2],
  [2, 2, 2, 1, 2, 2, 1],
  [2, 2, 1, 2, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 2, 2]
]);

// A hacky way for figuring out whether a scale should
// be interpreted in terms of sharps or flats. true denotes sharp.
const firstThreeNotesToSharp = {
  "013": false,
  "023": false,
  "024": false,
  "124": true,
  "134": true,
  "135": false, // special case--could also be interpreted as sharp.
};

// rearrange the noteNames list to start from a given root.
function getNotesFromRoot(rootIdx) {
  let back = noteList.takeLast(12 - rootIdx);
  let front = noteList.take(rootIdx);

  return back.concat(front);
}

function getKeyList(octaves, root) {
  let keyList = [];
  let notesFromRoot = getNotesFromRoot(root);

  for (let i = 0; i < octaves; i++) {
    for (let note of notesFromRoot) {
      keyList.push(note);
    }
  }

  return List(keyList);
}

function getIntervals(octaves, modeIdx) {
  let intervals = [];
  let modeFormula = modeFormulas.get(modeIdx);

  for (let i = 0; i < octaves; i++) {
    for (let step of modeFormula) {
      intervals.push(step);
    }
  }

  return List(intervals);
}

// Get the particular keys in a mode/scale.
// TODO: make this less convoluted.
function getScale(octaves, root, modeIdx) {
  let scale = {};
  let keySig = getModeAdjustedSignature(root, modeIdx);

  for (let i = 0; i < octaves; i++) {
    for (let j = 0; j < 7; j++) {
      let keyIndex = keySig.sig[j] + (i*12);
      scale[keyIndex] = keySig.names[j];
      console.log(keyIndex);
    }
  }

  return scale;

  /*
  let firstThreeNotes, sharp;
  
  let intervals = getIntervals(octaves, modeIdx);
  let counter = root;
  let scale = [];

  for (let i = 0; i < intervals.size; i++) {
    scale.push(counter);
    counter = (counter + intervals.get(i)) % (octaves * 12);
  } 
  scale.sort((a, b) => a - b);

  firstThreeNotes = scale.slice(0, 3).join("");
  sharp = firstThreeNotesToSharp[firstThreeNotes];

  let scaleMap = {};
  for (let key of scale) {
    let note = noteList.get(key % 12);
    let keyName
    if (!note[1]) {
      if (sharp) {
        keyName = note[0];
      } else {
        keyName = note[2];
      }
    } else {
      keyName = note[1];
    }
    scaleMap[key] = keyName; 
  }

  return scaleMap;
  */
}

export {
  noteList,
  circleOfFifths,
  modeNames,
  modeFormulas,
  getNotesFromRoot,
  getKeyList,
  getIntervals,
  getScale
};