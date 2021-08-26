import React from "react";
import { useState } from "react";
import { Map } from "immutable";

import SvgKeybed from "./SvgKeybed";
import RootSlider from "./RootSlider";
import { noteNames, getScale } from "./Theory";

const App = (props) => {
  const [ state, setState ] = useState(Map({
    activeRoot: "Eb",
    activeMode: 0,
    activeKeys: getScale(4, 0, "Eb")
  }));

  function updateRoot(evt) {
    let noteIdx = evt.target.valueAsNumber;
    let noteName = noteNames.get(noteIdx);
    let newScale = getScale(4, state.get("activeMode"), noteName);

    let newState = state.merge({
      activeRoot: noteName,
      activeKeys: newScale
    });

    setState(newState);
  }

  return (
    <div id="appWindow">
      <SvgKeybed activeKeys={ state.get("activeKeys") } />
      <RootSlider updateRoot={ updateRoot } />
    </div>
  );
};


export default App;