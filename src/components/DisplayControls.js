import React from "react";


const RootOnBottomToggle = ({ changeHandler }) => {
  return (
    <div className="rootOnBottomCheck">
      <label>Root on Bottom</label>
      <input name="rootOnBottom"
             type="checkbox"
             onChange={ (evt) => changeHandler(evt.target.checked) } />
    </div>
  );
}

const ScaleDegreeSelector = ({ changeHandler }) => {
  return (
    <div className="scaleDegreeRadio" onChange={ (evt) => changeHandler(evt.target.value) }>
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

export {
  RootOnBottomToggle,
  ScaleDegreeSelector
};