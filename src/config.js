import { getScale } from "./lib/Theory";

const defaultOctaves = 4;

const defaultState = {
  // display options
  rootDisplayMode: 0, // 0 for chromaticv, 1 for circle of fifths
  rootOnBottom: false,
  // scale & chord state
  activeRoot: 0,
  activeMode: 0,
  activeChord: 0,
  activeKeys: getScale(defaultOctaves, 0, 0)
};

export {
  defaultOctaves,
  defaultState
};