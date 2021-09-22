const keySignatures = [
  // C Major / A Minor (no sharps/flats)
  { root: 0, 
    sig: [0, 2, 4, 5, 7, 9, 11],
    names: [ "C", "D", "E", "F", "G", "A", "B" ] },
  // G major / E minor (1 sharp)
  { root: 7,
    sig: [0, 2, 4, 6, 7, 9, 11],
    names: ["C", "D", "E", "F\u266F", "G", "A", "B"] },
  // D major / B minor (2 sharps)
  { root: 2,
    sig: [1, 2, 4, 6, 7, 9, 11],
    names: [ "C\u266F", "D", "E", "F\u266F", "G", "A", "B" ] },
  // A major / F# minor (3 sharps)
  { root: 9,
    sig: [1, 2, 4, 6, 8, 9, 11],
    names: [ "C\u266F", "D", "E", "F\u266F", "G\u266F", "A", "B" ] },
  // E major / C# minor (4 sharps)
  { root: 4,
    sig: [1, 3, 4, 6, 8, 9, 11],
    names: [ "C\u266F", "D\u266F", "E", "F\u266F", "G\u266F", "A", "B" ] },
  /*
  the following three key signatures could be interpreted differently 
  depending on the context and the musician's purposes/needs.
  */
  // B major / G# minor (5 sharps)
  { root: 11,
    sig: [1, 3, 4, 6, 8, 10, 11],
    names: [ "C\u266F", "D\u266F", "E", "F\u266F", "G\u266F", "A\u266F", "B" ] },
  // Gb major / Eb minor (6 flats)
  { root: 6,
    sig: [1, 3, 5, 6, 8, 10, 11],
    names: [ "D\u266D", "E\u266D", "F", "G\u266D", "A\u266D", "B\u266D", "C\u266D" ] },
  // Db Major / Bb minor (5 flats)
  { root: 1,
    sig: [0, 1, 3, 5, 6, 8, 10],
    names: [ "C", "D\u266D", "E\u266D", "F", "G\u266D", "A\u266D", "B\u266D" ] },
  /**/
  // Ab major / F minor (4 flats)
  { root: 8,
    sig: [0, 1, 3, 5, 7, 8, 10],
    names: [ "C", "D\u266D", "E\u266D", "F", "G", "A\u266D", "B\u266D" ] },
  // Eb major / C minor (3 flats)
  { root: 3,
    sig: [0, 2, 3, 5, 7, 8, 10],
    names: [ "C", "D", "E\u266D", "F", "G", "A\u266D", "B\u266D" ] },
  // Bb major / G minor (2 flats)
  { root: 10,
    sig: [0, 2, 3, 5, 7, 9, 10],
    names: [ "C", "D", "E\u266D", "F", "G", "A", "B\u266D" ] },
  // F major / D minor (1 flat)
  { root: 5,
    sig: [0, 2, 4, 5, 7, 9, 10],
    names: [ "C", "D", "E", "F", "G", "A", "B\u266D" ]}
];

const modeDisplacements = [
  0, 10, 8, 7, 5, 3, 1 
];

const chromaticScale = [
  "C", "C\u266F/D\u266D", "D", "D\u266F/E\u266D", "E", "F",
  "F\u266F/G\u266D", "G", "G\u266F/A\u266D", "A", "A\u266F/B\u266D", "B" 
];

const circleOfFifths = [
  "C", "G", "D", "A", "E", "B", "F\u266F/G\u266D", "C\u266F/D\u266D",
  "G\u266F/A\u266D", "D\u266F/E\u266D", "A\u266F/B\u266D", "F"
];

// utility fn: take the first n elements of an array and stick them on
// the back of the array. 
function rotate(array, n) {
  let front = array.slice(0, n);
  let back = array.slice(n);
  return back.concat(front)
}

// find the correct key signature, given a root note and the mode.
function getModeAdjustedSignature(root, modeIdx) {
  let adjustedRoot = (root + modeDisplacements[modeIdx]) % 12;
  return keySignatures.find(item => item.root == adjustedRoot);
}

// get numerical scale degrees for a given root.
function getScaleDegrees(root, keySig) {
  let degreeStart = keySig.sig.indexOf(root);
  let front = [];
  let back = [];

  for (let i = 0; i < 7; i++) {
    if (i >= (7-degreeStart)) {
      front.push(i+1);
    } else {
      back.push(i+1);
    }
  }

  return front.concat(back);
}

// get the names of the notes in a keysig, rotated to reflect
// a particular root and mode.
function getScaleNotes(root, modeIdx) {
  let keySig = getModeAdjustedSignature(root, modeIdx);
  let scaleNotes = rotate(keySig.names, keySig.sig.indexOf(root));
  return scaleNotes;
}

// Get the particular keys in a mode/scale.
function getScale(octaves, root, modeIdx) {
  let keySig = getModeAdjustedSignature(root, modeIdx);
  let degrees = getScaleDegrees(root, keySig);
  let scale = {};

  for (let i = 0; i < octaves; i++) {
    for (let j = 0; j < 7; j++) {
      let keyIndex = keySig.sig[j] + (i*12);
      scale[keyIndex] = {
        degree: degrees[j],
        name: keySig.names[j]
      }
    }
  }

  return scale;
}

// type refers to triad or seventh.
function getChordDegrees(root, chordMode) {
  if (chordMode == 0) {
    return [ 0, 2, 4 ].map(v => root + v).map(v => (v % 7) + 1);
  } else if (chordMode == 1) {
    return [ 0, 2, 4, 6 ].map(v => root + v).map(v => (v % 7) + 1);
  }
}

export {
  keySignatures,
  chromaticScale,
  circleOfFifths,
  rotate,
  getScale,
  getScaleNotes,
  getChordDegrees
};