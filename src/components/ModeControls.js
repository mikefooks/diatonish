import React from "react";

const ModeSlider = (props) => {
  return <input id="mode"
                name="mode"
                type="range"
                value={ props.activeMode }
                min="0"
                max="6"
                onChange={ props.updateMode }></input>;
}

const ModeDisplay = (props) => {
  return <div className="modeDisplay">
    <h2>{ props.activeMode }</h2>
  </div>;
}

export  {
  ModeSlider,
  ModeDisplay
};