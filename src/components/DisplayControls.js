import React from "react";


const RootOnBottomToggle = ({ changeHandler }) => {
  return (
    <div className="rootOnBottom">
      <input name="rootOnBottom"
             type="checkbox"
             onChange={ (evt) => changeHandler(evt.target.checked) } />
      <label>Root on Bottom</label>
    </div>
  );
}

const ScaleDegreeSelector = ({ changeHandler }) => {
  return (
    <fieldset onChange={ (evt) => changeHandler(evt.target.value) }>
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
    </fieldset>
  );
}

export {
  RootOnBottomToggle,
  ScaleDegreeSelector
};