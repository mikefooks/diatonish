import React from "react";
import { useState } from "react";
import { Map } from "immutable";

import SvgKeybed from "./SvgKeybed";
import { RootSlider, RootDisplay } from "./RootControls";
import { ModeSlider, ModeDisplay } from "./ModeControls";
import { modeNames, circleOfFifths, getScale } from "./Theory";

const defaultOctaves = 4;

const App = (props) => {
  // Setting up state store and defining default values.
  const [ state, setState ] = useState(Map({
    activeRoot: "Eb",
    activeMode: 0,
    activeKeys: getScale(4, 0, "Eb")
  }));

  // Updates the UI to reflect changes to the RootSlider input.
  function updateRoot(evt) {
    let noteIdx = evt.target.valueAsNumber;
    let noteName = circleOfFifths.get(noteIdx);
    let newScale = getScale(defaultOctaves, state.get("activeMode"), noteName);

    let newState = state.merge({
      activeRoot: noteName,
      activeKeys: newScale
    });

    setState(newState);
  }

  function updateMode(evt) {
    let newMode = evt.target.valueAsNumber;
    let newScale = getScale(defaultOctaves, newMode, state.get("activeRoot"));

    let newState = state.merge({
      activeMode: newMode,
      activeKeys: newScale
    });

    setState(newState);
  }

  return (
    <div id="appWindow">
      <SvgKeybed activeKeys={ state.get("activeKeys") } />
      <div className="rootControls">
        <RootSlider updateRoot={ updateRoot } />
        <RootDisplay activeRoot={ state.get("activeRoot") } />
      </div>
      <div className="modeControls">
        <ModeSlider updateMode={ updateMode } />
        <ModeDisplay activeMode={ modeNames.get(state.get("activeMode")) } />
      </div>
    </div>
  );
};

export default App;