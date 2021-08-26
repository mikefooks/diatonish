import React from "react";

const RootSlider = (props) => {
  return <input id="rootSlider"
                name="rootSlider"
                type="range"
                min="0"
                max="11"
                onChange={ props.updateRoot }></input>
};

const RootDisplay = (props) => {
  return <div className="rootDisplay">
    <h2>{ props.activeRoot }</h2>
  </div>;
}

export {
  RootSlider,
  RootDisplay
};