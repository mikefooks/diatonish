import React from "react";
import { useState } from "react";
import { Map } from "immutable";

// config and utilities.
import config from "./config";
import { modeNames, circleOfFifths, getScale } from "./Theory";

// components
import SvgKeybed from "./SvgKeybed";
import { RootSlider, RootDisplay, RootOnBottomToggle } from "./RootControls";
import { ModeSlider, ModeDisplay } from "./ModeControls";


const App = (props) => {
  // Setting up state store and defining default values.
  const [ state, setState ] = useState(Map({
    activeRoot: 0,
    rootOnBottom: false,
    activeMode: 4,
    activeKeys: getScale(config.defaultOctaves, 0, 4)
  }));

  // Update the UI to reflect changes to the RootSlider input.
  function updateRoot(evt) {
    let noteIdx = evt.target.valueAsNumber;
    let newScale = getScale(config.defaultOctaves, noteIdx, state.get("activeMode"));

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