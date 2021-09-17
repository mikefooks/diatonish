import React from "react";
import { useState } from "react";
import { Map } from "immutable";

// config and utilities.
import { defaultOctaves, defaultState } from "./config";
import { getChordDegrees, getScale } from "./lib/Theory";

// components
import SvgKeybed from "./components/SvgKeybed";
import RootControls from "./components/RootControls";
import ModeControls from "./components/ModeControls";
import ChordControls from "./components/ChordControls";
import { ScaleDegreeSelector,
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

  // "root display mode" refers to chromatic/circle of fifths
  function toggleRootDisplay(val) {
    setState(state.set("rootDisplayMode", val));
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

  function updateChord(newActiveChord) {
    let newState = state.merge({
      activeChord: newActiveChord,
      chordScaleDegrees: getChordDegrees(newActiveChord)
    });

    setState(newState);
  }

  // Handlers for display option controls.

  function selectDegreeMode(value) {
    let newState = state.merge({
      scaleDegreeMode: value
    });

    setState(newState);
  }

  function toggleRootOnBottom(checked) {
    setState(state.set("rootOnBottom", checked));
  }

  return (
    <div id="appWindow">
      <SvgKeybed activeRoot= { state.get("activeRoot") }
                 activeKeys={ state.get("activeKeys") }
                 scaleDegreeMode={ state.get("scaleDegreeMode") }
                 activeChord={ state.get("activeChord") }
                 chordScaleDegrees={ state.get("chordScaleDegrees") }
                 rootOnBottom={ state.get("rootOnBottom") } />
      <div className="controls">
        <RootControls rootDisplayMode={ state.get("rootDisplayMode") }
                      activeRoot={ state.get("activeRoot") }
                      updateRootFn={ updateRoot }
                      updateDisplayModeFn={ toggleRootDisplay } />
        <ModeControls activeMode={ state.get("activeMode") }
                      changeHandler={ updateMode } />
        <div className="chordControl">
          <div className="chordControl--label">
            <h3>Chord</h3>
          </div>
          <ChordControls activeChord={ state.get("activeChord") }
                         changeHandler={ updateChord } />
        </div>
        { /* display controls */ }
        <div class="displayOptions">
          <RootOnBottomToggle changeHandler={ toggleRootOnBottom } />        
          <ScaleDegreeSelector changeHandler={ selectDegreeMode } />
        </div>
      </div>
    </div>
  );
};

export default App;