import React from "react";


const RootOnBottomToggle = ({ changeHandler }) => {
  return (
    <div className="rootOnBottomToggle">
      <label>Root on Bottom</label>
      <input name="rootOnBottom"
             type="checkbox"
             onChange={ (evt) => changeHandler(evt.target.checked) } />
    </div>
  );
}

const DegreeModeSelector = ({ changeHandler }) => {
  return (
    <div className="scaleDegreeSelector"
         onChange={ (evt) => changeHandler(evt.target.value) }>
      <div>
        <label>Hide</label>
        <input type="radio"
              name="degreeMode"
              value="0"
              defaultChecked />
      </div>
      <div>
        <label>Scale Degrees</label>
        <input type="radio"
              name="degreeMode"
              value="1" />
      </div>
      <div>
        <label>Chord Degrees</label>
        <input type="radio"
              name="degreeMode"
              value="2" />
      </div>
    </div>
  );
}

const ChordModeSelector = ({ changeHandler }) => {
  return (
    <div className="chordModeSelector"
         onChange={ (evt) => changeHandler(evt.target.value) }>
      <div>
        <label>Triads</label>
        <input type="radio"
               name="chordMode"
               value="0"
               defaultChecked />
      </div>
      <div>
        <label>Sevenths</label>
        <input type="radio"
               name="chordMode"
               value="1" />
      </div>
    </div>
  )
}


export {
  RootOnBottomToggle,
  DegreeModeSelector,
  ChordModeSelector
};