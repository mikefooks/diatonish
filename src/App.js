import React from "react";
import { useState } from "react";
import { Map } from "immutable";

import SvgKeybed from "./SvgKeybed";
import { RootSlider, RootDisplay, RootOnBottomToggle } from "./RootControls";
import { ModeSlider, ModeDisplay } from "./ModeControls";
import { modeNames, circleOfFifths, getScale } from "./Theory";


const defaultOctaves = 4;

const App = (props) => {
  // Setting up state store and defining default values.
  const [ state, setState ] = useState(Map({
    activeRoot: 0,
    rootOnBottom: false,
    activeMode: 0,
    activeKeys: getScale(defaultOctaves, 0, 0)
  }));

  // Update the UI to reflect changes to the RootSlider input.
  function updateRoot(evt) {
    let noteIdx = evt.target.valueAsNumber;
    let newScale = getScale(defaultOctaves, noteIdx, state.get("activeMode"));

    let newState = state.merge({
      activeRoot: noteIdx,
      activeKeys: newScale
    });

    setState(newState);
  }

  function toggleRootOnBottom(evt) {
    setState(state.set("rootOnBottom", evt.target.checked));
  }

  function updateMode(evt) {
    let newMode = evt.target.valueAsNumber;
    let newScale = getScale(defaultOctaves, state.get("activeRoot"), newMode);

    let newState = state.merge({
      activeMode: newMode,
      activeKeys: newScale
    });

    setState(newState);
  }

  return (
    <div id="appWindow">
      <SvgKeybed activeRoot= { state.get("activeRoot") }
                 activeKeys={ state.get("activeKeys") }
                 rootOnBottom={ state.get("rootOnBottom") } />
      <div className="rootControls">
        <RootOnBottomToggle toggleRootOnBottom={ toggleRootOnBottom } />
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