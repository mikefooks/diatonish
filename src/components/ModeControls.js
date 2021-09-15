import React from "react";


import { modeNames } from "../lib/Theory";

const ModeControls = (props) => {
  let { activeMode, changeHandler } = props;

  let displayPanes = modeNames.map((val, idx) => {
    let active = idx == activeMode ? "active" : "";
    let classes = `displayPane ${active}`.trimEnd();

    return (
      <div className={ classes }
           onMouseDown={ () => changeHandler(idx) }>
        <h3>
          { idx + 1 }
        </h3>
      </div>
    );
  });

  return (
    <div className={ "modeControls" }>
      <input type="range"
             min="0"
             max={ modeNames.length - 1 }
             value={ activeMode }
             onChange={ (evt) => changeHandler(evt.target.valueAsNumber) } >
      </input>
      <div className="displayPanes">
        { displayPanes }
      </div>
      <div class="activeModeName">
        { modeNames[activeMode] }
      </div>
    </div>
  );
};

export default ModeControls;