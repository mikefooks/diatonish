import React from "react";

import { chordNumerals } from "../lib/Theory";


const ChordControls = (props) => {
  let { activeChord, changeHandler } = props;

  let displayPanes = chordNumerals.map((val, idx) => {
    let active = idx == activeChord ? "active" : "";
    let classes = `displayPane ${active}`.trimEnd();

    return (
      <div className={ classes }
           onMouseDown={ () => {  changeHandler(idx) } }>
        <h3>
          { val }
        </h3>
      </div>
    );
  });

  return (
    <div className={ "chordControls" }>
      <input type="range"
              min="0"
              max={ chordNumerals.length - 1 }
              value={ activeChord }
              onChange={ (evt) => changeHandler(evt.target.valueAsNumber) }/>
      <div className="displayPanes">
        { displayPanes }
      </div>
    </div>
  );
};

export default ChordControls;