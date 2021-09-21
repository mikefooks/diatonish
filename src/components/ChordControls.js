import React from "react";

import { chromaticScale,
         rotate,
         getScaleNotes } from "../lib/Theory";


const numerals = [
  "i", "ii", "iii", "iv", "v", "vi", "vii"
];

const majorChordQualities = [0, 1, 1, 0, 0, 1, 2];

function getChordQuality(numeral, quality) {
  switch (quality) {
    case 0:
      return numeral.toUpperCase();
    case 1:
      return numeral;
    case 2:
      return numeral + "o";
    default:
      return numeral;
  }
}

function getChordName(rootNote, quality) {
  switch (quality) {
    case 0:
      return rootNote + "maj";
    case 1:
      return rootNote + "min";
    case 2:
      return rootNote + "dim";
  }
}

const ChordSlider = (props) => {
  let { activeMode, activeChord, updateChordFn } = props;

  let chordQualities = rotate(majorChordQualities, activeMode);
  let chordNumerals = numerals.map((val, idx) => {
    return getChordQuality(val, chordQualities[idx]);
  });

  let displayPanes = chordNumerals.map((val, idx) => {
    let active = idx == activeChord ? "active" : "";
    let classes = `displayPane ${active}`.trimEnd();

    return (
      <div className={ classes }
           onMouseDown={ () => { updateChordFn(idx) } }>
        <h3>
          { val }
        </h3>
      </div>
    );
  });

  return (
    <div className="chordControl--input">
      <input type="range"
              min="0"
              max={ numerals.length - 1 }
              value={ activeChord }
              onChange={ (evt) => updateChordFn(evt.target.valueAsNumber) }/>
      <div className="displayPanes">
        { displayPanes }
      </div>
    </div>
  );
};

const ChordControls = (props) => {
  const { activeRoot,
          activeMode,
          activeChord,
          updateChordFn } = props;

  let activeChordQuality = rotate(majorChordQualities, activeMode)[activeChord];
  let scaleNotes = getScaleNotes(activeRoot, activeMode);
  let activeChordName = getChordName(scaleNotes[activeChord], activeChordQuality);

  return (
    <div className="chordControl">
      <div className="chordControl--label">
        <h3>Chord</h3>
      </div>
      <ChordSlider activeMode={ activeMode }
                   activeChord={ activeChord }
                   updateChordFn={ updateChordFn } />
      <div className="chordControl--options">
        <h3>{ activeChordName }</h3>
      </div>
    </div>
  );
}

export default ChordControls;