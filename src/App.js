import React from "react";
import { useState } from "react";
import { Map } from "immutable";

// config and utilities.
import { defaultOctaves, defaultState } from "./config";
import { getChordDegrees, getScale } from "./lib/Theory";

// components
import SvgKeybed from "./components/SvgKeybed";
import { RootControls,
         DisplayModeToggle } from "./components/RootControls";
import ModeControls from "./components/ModeControls";
import ChordControls from "./components/ChordControls";
import { RootOnBottomToggle } from "./components/DisplayControls";


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

  function updateChord(newChordRoot) {
    let newState = state.merge({
      chordRoot: newChordRoot,
      chordScaleDegrees: getChordDegrees(newChordRoot)
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
                 chordScaleDegrees={ state.get("chordScaleDegrees") }
                 rootOnBottom={ state.get("rootOnBottom") } />
      <div id="controlSliders">
        <div>
        <RootControls rootDisplayMode={ state.get("rootDisplayMode") }
                      activeValue={ state.get("activeRoot") }
                      changeHandler={ updateRoot } />
        <DisplayModeToggle changeHandler={ toggleRootDisplay } />
        </div>
        <div>
        <ModeControls activeMode={ state.get("activeMode") }
                      changeHandler={ updateMode } />
        </div>
        <div>
        <ChordControls chordRoot={ state.get("chordRoot") }
                       changeHandler={ updateChord } />
        </div>
        { /* display controls */ }
        <RootOnBottomToggle changeHandler={ toggleRootOnBottom } />
      </div>
    </div>
  );
};

export default App;