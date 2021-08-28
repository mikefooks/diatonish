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

const sharpKeys = List.of(
  0, 7, 2, 9, 4, 11
);

const flatKeys = List.of(
  6, 1, 8, 3, 10, 5   
)

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
  let intervals = getIntervals(octaves, modeIdx);
  let sharp = sharpKeys.indexOf(root) > 0 ? true : false;

  let counter = root;
  let scale = [];

  for (let i = 0; i < intervals.size; i++) {
    let key = noteList.get(counter % 12);
    let keyName;

    if (!key[1]) {
      if (sharp) {
        keyName = key[0];
      } else {
        keyName = key[2];
      }
    } else {
      keyName = key[1];
    }

    scale.push([counter, keyName]);

    counter = (counter + intervals.get(i)) % (octaves * 12);
  }
  
  return List(scale);
}


export default {
  noteList,
  sharpKeys,
  circleOfFifths,
  modeNames,
  modeFormulas,
  getNotesFromRoot,
  getKeyList,
  getIntervals,
  getScale
};