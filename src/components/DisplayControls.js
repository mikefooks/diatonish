import React from "react";


const DisplayModeToggle = ({ changeHandler }) => {
  return (
    <fieldset onChange={ (evt) => changeHandler(evt.target.value) }>
      <input type="radio"
             name="displayMode"
             value="0"
             defaultChecked />
      <input type="radio"
             name="displayMode"
             value="1" />
    </fieldset>
  );
};

const RootOnBottomToggle = ({ toggleRootOnBottom }) => {
  return <input id="rootOnBottom"
                name="rootOnBottom"
                type="checkbox"
                onChange={ toggleRootOnBottom }></input>
}

export {
  DisplayModeToggle,
  RootOnBottomToggle
};