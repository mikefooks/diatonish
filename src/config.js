import { getScale } from "./lib/Theory";

const defaultOctaves = 4;

const defaultState = {
  activeRoot: 0,
  rootOnBottom: false,
  activeMode: 0,
  activeKeys: getScale(defaultOctaves, 0, 0)
};

export {
  defaultOctaves,
  defaultState
};