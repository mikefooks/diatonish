import { List, Map } from "immutable";

const noteList = List([
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
]);

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
function getScale(octaves, root, modeIdx) {
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