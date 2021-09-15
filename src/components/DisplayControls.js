import React from "react";


const RootOnBottomToggle = ({ changeHandler }) => {
  return <input id="rootOnBottom"
                name="rootOnBottom"
                type="checkbox"
                onChange={ (evt) => changeHandler(evt.target.checked) } />
}

export {
  RootOnBottomToggle
};