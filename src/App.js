import React from "react";
import { useState } from "react";
import { Map } from "immutable";

// config and utilities.
import { defaultOctaves, defaultState } from "./config";
import { getScale } from "./lib/Theory";

// components
import SvgKeybed from "./components/SvgKeybed";
import RootControls from "./components/RootControls";
import ModeControls from "./components/ModeControls";
import ChordControls from "./components/ChordControls";
import { DisplayModeToggle,
         RootOnBottomToggle } from "./components/DisplayControls";


const App = (props) => {

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

  function updateChord(newChord) {
    let newState = state.merge({
      activeChord: newChord
    });

    setState(newState);
  }

  // Handlers for display option controls.

  // "root display mode" refers to chromatic/circle of fifths
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
        <div>
        <RootControls rootDisplayMode={ state.get("rootDisplayMode") }
                      activeValue={ state.get("activeRoot") }
                      changeHandler={ updateRoot } />
        </div>
        <div>
        <ModeControls activeMode={ state.get("activeMode") }
                      changeHandler={ updateMode } />
        </div>
        <div>
        <ChordControls activeChord={ state.get("activeChord") }
                       changeHandler={ updateChord } />
        </div>
        { /* display controls */ }
        <DisplayModeToggle changeHandler={ toggleRootDisplay } />
        <RootOnBottomToggle changeHandler={ toggleRootOnBottom } />
      </div>
    </div>
  );
};

export default App;