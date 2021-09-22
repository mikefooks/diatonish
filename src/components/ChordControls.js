import React from "react";

import { 
  rotate,
  getScaleNotes
} from "../lib/Theory";


const numerals = [
  "i", "ii", "iii", "iv", "v", "vi", "vii"
];

// 0 = major, 1 = minor, 2 = diminished
const triadChordQualities = [0, 1, 1, 0, 0, 1, 2];

// 0 = major 7, 1 = minor 7, 2 = half-diminished, 3 = dominant 7
const seventhChordQualities = [0, 1, 1, 0, 3, 1, 2];

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

function getChordName(rootNote, chordMode, quality) {
  if (chordMode == 0) {
    switch (quality) {
      case 0:
        return rootNote + "maj";
      case 1:
        return rootNote + "min";
      case 2:
        return rootNote + "dim";
    }
  } else {
    switch (quality) {
      case 0:
        return rootNote + "maj7";
      case 1:
        return rootNote + "min7";
      case 2:
        return rootNote + "dim7";
      case 3:
        return rootNote + "7";
    }
  }
}

const ChordSlider = (props) => {
  let { activeMode, activeChord, updateChordFn } = props;

  let chordQualities = rotate(triadChordQualities, activeMode);
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
          chordMode,
          activeChord,
          updateChordFn } = props;

  let activeChordQuality;
  
  if (chordMode == 0) {
    activeChordQuality = rotate(triadChordQualities, activeMode)[activeChord];
  } else if (chordMode == 1) {
    activeChordQuality = rotate(seventhChordQualities, activeMode)[activeChord];
  }

  let scaleNotes = getScaleNotes(activeRoot, activeMode);
  let activeChordName = getChordName(scaleNotes[activeChord],
                                     chordMode,
                                     activeChordQuality);
  
  console.log(activeChordQuality);

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