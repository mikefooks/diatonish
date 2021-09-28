import { getScale } from "./lib/Theory";

const defaultOctaves = 4;

const defaultState = {
  // display options
  rootIncrMode: 0, // 0 for chromatic, 1 for circle of fifths
  rootOnBottom: false,
  chordMode: 0, // 0 for hide, 1 for triads, 2 for sevenths.
  degreeMode: 0, // 0 for hide, 1 for scale degrees, 2 for chord degrees.

  // scale & chord state
  activeRoot: 0,
  activeMode: 0,
  activeKeys: getScale(defaultOctaves, 0, 0),
  activeChord: 0,
  chordScaleDegrees: [1, 3, 5]
};

export {
  defaultOctaves,
  defaultState
};