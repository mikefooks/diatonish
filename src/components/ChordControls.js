import React from "react";


const chordNumerals = [
  "i", "ii", "iii", "iv", "v", "vi", "vii"
];

const majorChordQualities = [0, 1, 1, 0, 0, 1, 2];

const ChordSlider = (props) => {
  let { activeChord, updateChordFn } = props;

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
              max={ chordNumerals.length - 1 }
              value={ activeChord }
              onChange={ (evt) => updateChordFn(evt.target.valueAsNumber) }/>
      <div className="displayPanes">
        { displayPanes }
      </div>
    </div>
  );
};

const ChordControls = (props) => {
  const { activeChord,
          updateChordFn } = props;

  return (
    <div className="chordControl">
      <div className="chordControl--label">
        <h3>Chord</h3>
      </div>
      <ChordSlider activeChord={ activeChord }
                   updateChordFn={ updateChordFn } />
    </div>
  );
}

export default ChordControls;