import React from "react";


const DisplayModeToggle = ({ changeHandler }) => {
  return (
    <fieldset onChange={ (evt) => changeHandler(evt.target.value) }>
      <label>Chromatic</label>
      <input type="radio"
             name="displayMode"
             value="0"
             defaultChecked />
      <label>Circle of Fifths</label>
      <input type="radio"
             name="displayMode"
             value="1" />
    </fieldset>
  );
};

const RootOnBottomToggle = ({ changeHandler }) => {
  return <input id="rootOnBottom"
                name="rootOnBottom"
                type="checkbox"
                onChange={ (evt) => changeHandler(evt.target.checked) } />
}

export {
  DisplayModeToggle,
  RootOnBottomToggle
};