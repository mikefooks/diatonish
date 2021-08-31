import React from "react";

const rootNames = [
  "C", "C\u266F/D\u266D", "D", "D\u266F/E\u266D", "E", "F",
  "F\u266F/G\u266D", "G", "G\u266F/A\u266D", "A", "A\u266F/B\u266D", "B" 
];

const RootSlider = (props) => {
  return <input id="rootSlider"
                name="rootSlider"
                value={ props.activeRoot }
                type="range"
                min="0"
                max="11"
                onChange={ props.updateRoot }></input>
};

const RootOnBottomToggle = (props) => {
  return <input id="rootOnBottom"
                name="rootOnBottom"
                type="checkbox"
                onChange={ props.toggleRootOnBottom }></input>
}

const RootDisplay = (props) => {
  return <div className="rootDisplay">
    <h2>{ rootNames[props.activeRoot] }</h2>
  </div>;
}

export {
  RootSlider,
  RootOnBottomToggle,
  RootDisplay
};