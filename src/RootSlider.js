import React from "react";

const RootSlider = (props) => {
  return <input id="root"
                name="root"
                type="range"
                min="0"
                max="11"
                onChange={ props.updateRoot }></input>;
};

export default RootSlider;