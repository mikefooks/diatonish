import React from "react";


const RootOnBottomToggle = ({ changeHandler }) => {
  return (
    <div className="rootOnBottomToggle">
      <label>Root Flush Left</label>
      <input name="rootOnBottom"
             type="checkbox"
             onChange={ (evt) => changeHandler(evt.target.checked) } />
    </div>
  );
};

const RootIncrModeToggle = ({ changeHandler }) => {
  return (
    <div className="rootIncrModeToggle"
          onChange={ (evt) => changeHandler(evt.target.value) }>
      <div>
        <h4>Root Increment</h4>
      </div>
      <div>
        <label>Chromatic</label>
        <input type="radio"
               name="displayMode"
               value="0"
               defaultChecked />
      </div>
      <div>
        <label>Circle of Fifths</label>
        <input type="radio"
               name="displayMode"
               value="1" />
      </div>
    </div>
  );
};

const DegreeModeSelector = ({ changeHandler }) => {
  return (
    <div className="scaleDegreeSelector"
         onChange={ (evt) => changeHandler(evt.target.value) }>
      <div>
        <h4>Degrees</h4>
      </div>
      <div>
        <label>Hide</label>
        <input type="radio"
              name="degreeMode"
              value="0"
              defaultChecked />
      </div>
      <div>
        <label>Scale</label>
        <input type="radio"
              name="degreeMode"
              value="1" />
      </div>
      <div>
        <label>Chord</label>
        <input type="radio"
              name="degreeMode"
              value="2" />
      </div>
    </div>
  );
};

const ChordModeSelector = ({ changeHandler }) => {
  return (
    <div className="chordModeSelector"
         onChange={ (evt) => changeHandler(evt.target.value) }>
      <div>
        <h4>Chord Type</h4>
      </div>
      <div>
        <label>Hide</label>
        <input type="radio"
               name="chordMode"
               value={ 0 }
               defaultChecked />
      </div>
      <div>
        <label>Triad</label>
        <input type="radio"
               name="chordMode"
               value={ 1 } />
      </div>
      <div>
        <label>Seventh</label>
        <input type="radio"
               name="chordMode"
               value={ 2 } />
      </div>
    </div>
  )
};


export {
  RootOnBottomToggle,
  RootIncrModeToggle,
  DegreeModeSelector,
  ChordModeSelector
};
