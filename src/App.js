import React from "react";
import { useState } from "react";
import { Map } from "immutable";

// config and utilities.
import { defaultOctaves, defaultState } from "./config";
import { getChordDegrees, getScale } from "./lib/Theory";

// Components
import SvgKeybed from "./components/SvgKeybed";

import RootControls from "./components/RootControls";
import ModeControls from "./components/ModeControls";
import ChordControls from "./components/ChordControls";

import {
  RootOnBottomToggle,
  DegreeModeSelector,
  ChordModeSelector,
  RootIncrModeToggle
} from "./components/DisplayControls";


const App = (props) => {

  // Note: defaultState getting wrapped in an Immutable Map.
  const [ state, setState ] = useState(Map(defaultState));

  /**
   * Change handler for the Root
   * @param { Number } newRoot 
   */
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

  /**
   * Toggle between Chromatic and Circle of Fifths
   * @param { Number (0 or 1) } val 
   */
  function updateRootIncrMode(val) {
    setState(state.set("rootIncrMode", val));
  }

  /**
   * Change handler for the Mode slider/buttons.
   * @param { Number (0-6) } newMode 
   */
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

  /**
   * Change handler for the Chord slider/buttons
   * @param {Number (0-6)} newActiveChord 
   */
  function updateChord(newActiveChord) {
    let newState = state.merge({
      activeChord: newActiveChord,
      chordScaleDegrees: getChordDegrees(newActiveChord,
                                         state.get("chordMode"))
    });

    setState(newState);
  }

  // Display options

  /**
 * Toggle whether the scale root is translated to the
 * bottom of the keybed display.
 * @param { Boolean } checked 
 */
  function toggleRootOnBottom(checked) {
    setState(state.set("rootOnBottom", checked));
  }

  /**
   * Change handler for degree dispaly mode--
   * hide, scale degrees or chord degrees.
   * @param {Number (0-2)} value 
   */
  function selectDegreeMode(value) {
    let newState = state.merge({
      degreeMode: value
    });

    setState(newState);
  }

  /**
   * Show either triads or seventh chords.
   * @param { Number 0,1 } value 
   */
  function selectChordMode(newChordMode) {
    const newState = state.merge({
      chordMode: newChordMode,
      chordScaleDegrees: getChordDegrees(state.get("activeChord"),
                                         newChordMode)
    });

    setState(newState);
  }

  return (
    <div id="appWindow">
      <SvgKeybed activeRoot= { state.get("activeRoot") }
                 activeKeys={ state.get("activeKeys") }
                 activeChord={ state.get("activeChord") }
                 chordScaleDegrees={ state.get("chordScaleDegrees") }
                 rootOnBottom={ state.get("rootOnBottom") }
                 degreeMode={ state.get("degreeMode") }
                 chordMode={ state.get("chordMode") } />
      <div className="controls">
        { /* musical parameter controls */ }
        <div className="musicControls">
          <RootControls rootIncrMode={ state.get("rootIncrMode") }
                        activeRoot={ state.get("activeRoot") }
                        updateRootFn={ updateRoot } />
          <ModeControls activeMode={ state.get("activeMode") }
                        changeHandler={ updateMode } />
          <ChordControls activeRoot={ state.get("activeRoot") }
                         activeMode={ state.get("activeMode") }
                         chordMode={ state.get("chordMode") }
                         activeChord={ state.get("activeChord") }
                         updateChordFn={ updateChord } />
        </div>
        { /* display controls */ }
        <div className="displayOptions">
          <RootOnBottomToggle changeHandler={ toggleRootOnBottom } />
          <RootIncrModeToggle changeHandler={ updateRootIncrMode } />
          <DegreeModeSelector changeHandler={ selectDegreeMode } />
          <ChordModeSelector changeHandler={ selectChordMode } />
        </div>
      </div>
    </div>
  );
};

export default App;