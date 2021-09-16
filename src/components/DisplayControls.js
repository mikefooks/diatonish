import React from "react";


const RootOnBottomToggle = ({ changeHandler }) => {
  return (
    <div className="rootOnBottomCheck">
      <input name="rootOnBottom"
             type="checkbox"
             onChange={ (evt) => changeHandler(evt.target.checked) } />
      <label>Root on Bottom</label>
    </div>
  );
}

const ScaleDegreeSelector = ({ changeHandler }) => {
  return (
    <div className="scaleDegreeRadio" onChange={ (evt) => changeHandler(evt.target.value) }>
      <label>Hide</label>
      <input type="radio"
             name="degreeMode"
             value="0"
             defaultChecked />
      <label>Scale Degrees</label>
      <input type="radio"
             name="degreeMode"
             value="1" />
      <label>Chord Degrees</label>
      <input type="radio"
             name="degreeMode"
             value="2" />
    </div>
  );
}

export {
  RootOnBottomToggle,
  ScaleDegreeSelector
};