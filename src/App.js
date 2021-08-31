import React from "react";
import { useState } from "react";
import { Map } from "immutable";

// config and utilities.
import { defaultOctaves, defaultState } from "./config";
import { modeNames, getScale } from "./lib/Theory";

// components
import SvgKeybed from "./components/SvgKeybed";
import { RootSlider, RootDisplay, RootOnBottomToggle } from "./components/RootControls";
import { ModeSlider, ModeDisplay } from "./components/ModeControls";


const App = (props) => {
  /*
  Setting up state store and defining default values.
  State structure: {
    activeRoot: int,
    activeMode: int,
    rootOnBottom: boolean,
    activeKeys: Object ({ keyId (int) : keyName (String) }),
  }
  */

  // Note: defaultState getting wrapped in an Immutable Map.
  const [ state, setState ] = useState(Map(defaultState));

  // Handler fn to reflect changes to the RootSlider input.
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

  // Handler fn to reflect changes to the RootSlider input.
  function updateMode(evt) {
    let newMode = evt.target.valueAsNumber;
    let newScale = getScale(defaultOctaves,
                            state.get("activeRoot"),
                            newMode);

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
        <RootSlider activeRoot={ state.get("activeRoot") }
                    updateRoot={ updateRoot } />
        <RootDisplay activeRoot={ state.get("activeRoot") } />
      </div>
      <div className="modeControls">
        <ModeSlider activeMode={ state.get("activeMode") }
                    updateMode={ updateMode } />
        <ModeDisplay activeMode={ modeNames[state.get("activeMode")] } />
      </div>
    </div>
  );
};

export default App;