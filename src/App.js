import React from "react";
import { useState } from "react";
import { Map } from "immutable";

// config and utilities.
import { defaultOctaves, defaultState } from "./config";
import { modeNames,
         getScale } from "./lib/Theory";

// components
import SvgKeybed from "./components/SvgKeybed";
import RootControls from "./components/RootControls";
import ModeControls from "./components/ModeControls";
import { DisplayModeToggle, RootOnBottomToggle } from "./components/DisplayControls";


const App = (props) => {
  /*
  Setting up state store and defining default values.
  State structure: {
    rootSliderMode: int (0=chromatic, 1=circleOfFifths
    )
    activeRoot: int,
    activeMode: int,
    rootOnBottom: boolean,
    activeKeys: Object ({ keyId (int) : keyName (String) }),
  }
  */

  // Note: defaultState getting wrapped in an Immutable Map.
  const [ state, setState ] = useState(Map(defaultState));

  // Handler functions for the root and mode selectors.
  function updateRoot(newRoot) {;
    let newScale = getScale(defaultOctaves,
                            newRoot,
                            state.get("activeMode"));

    let newState = state.merge({
      activeRoot: newRoot,
      activeKeys: newScale
    });

    setState(newState);
  }

  function updateMode(newMode) {
    let newScale = getScale(defaultOctaves,
                            state.get("activeRoot"),
                            newMode);

    let newState = state.merge({
      activeMode: newMode,
      activeKeys: newScale
    });

    setState(newState);
  }

  function toggleRootDisplay(val) {
    setState(state.set("rootDisplayMode", val));
  }

  function toggleRootOnBottom(checked) {
    setState(state.set("rootOnBottom", checked));
  }

  return (
    <div id="appWindow">
      <SvgKeybed activeRoot= { state.get("activeRoot") }
                 activeKeys={ state.get("activeKeys") }
                 rootOnBottom={ state.get("rootOnBottom") } />
      <div id="controlSliders">
        <RootControls rootDisplayMode={ state.get("rootDisplayMode") }
                      activeValue={ state.get("activeRoot") }
                      changeHandler={ updateRoot } />
        <ModeControls values={ modeNames }
                      activeValue={ state.get("activeMode") }
                      changeHandler={ updateMode } />
        { /* display controls */ }
        <DisplayModeToggle changeHandler={ toggleRootDisplay } />
        <RootOnBottomToggle changeHandler={ toggleRootOnBottom } />
      </div>
    </div>
  );
};

/*
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
*/

export default App;