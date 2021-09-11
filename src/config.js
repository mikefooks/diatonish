import { getScale } from "./lib/Theory";

const defaultOctaves = 4;

const defaultState = {
  // display options
  rootDisplayMode: 0, // 0 for chromaticv, 1 for circle of fifths
  rootOnBottom: false,
  // scale & chord state
  activeRoot: 0,
  activeMode: 0,
  activeKeys: getScale(defaultOctaves, 0, 0),
  chordRoot: 0,
  chordScaleDegrees: [1, 3, 5]
};

export {
  defaultOctaves,
  defaultState
};