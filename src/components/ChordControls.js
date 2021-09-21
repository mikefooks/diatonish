import React from "react";


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
  }
}

// take the first n elements of an array and stick them on
// the back of the array. 
function rotate(array, n) {
  let front = array.slice(0, n);
  let back = array.slice(n);
  return back.concat(front)
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
           onMouseDown={ () => {  updateChordFn(idx) } }>
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
  const { activeMode,
          activeChord,
          updateChordFn } = props;

  return (
    <div className="chordControl">
      <div className="chordControl--label">
        <h3>Chord</h3>
      </div>
      <ChordSlider activeMode={ activeMode }
                   activeChord={ activeChord }
                   updateChordFn={ updateChordFn } />
      <div className="chordControl--options">
        <h3>Chord Name</h3>
      </div>
    </div>
  );
}

export default ChordControls;