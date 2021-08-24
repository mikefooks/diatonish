import { List, Map } from "immutable";

const noteNames = List.of(
  "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B",
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

// rearrange the noteNames list to start from a given root.
function getNotesFromRoot(root) {
  let rootIdx = noteNames.indexOf(root);
  let notesFromRoot = noteNames.takeLast(rootIdx);
  return notesFromRoot.concat(noteNames.take(rootIdx));
}

function getKeyList(octaves, root) {
  let keyNames = [];
  let notesFromRoot = getNotesFromRoot(root);
  for (let i = 0; i < octaves; i++) {
    for (let note of notesFromRoot) {
      keyNames.push(note + "_" + i);
    }
  }
  return List(keyNames);
}

function getIntervals(octaves, modeIdx) {
  let intervals = [];
  let modeFormula = modeFormulas.get(modeIdx);

  for (let i = 0; i < octaves; i++) {
    for (let step of modeFormula) {
      intervals.push(step);
    }
  }

  return List(intervals).butLast();
}

// Get the particular keys in a mode/scale.
function getScale(octaves, modeIdx, root) {
  let intervals = getIntervals(octaves, modeIdx)
  let keyList = getKeyList(octaves, root);

  let counter = 0;
  let scale = []
  let idxs = intervals.reduce(function (a, b) {
	  counter += b;
    return a.push(counter);
  }, List([ 0 ]));

  for (let i of idxs) {
    scale.push(keyList.get(i));
  }
  
  return List(scale);
}

export default {
  getNotesFromRoot,
  getKeyList,
  getIntervals,
  getScale
};