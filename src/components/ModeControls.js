import React from "react";


const modeNames = [
  "Ionian (Major)",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Aeolian (Minor)",
  "Locrian"  
];

const ModeControls = (props) => {
  let { activeMode, changeHandler } = props;

  let displayPanes = modeNames.map((_, idx) => {
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
    <div className="modeControls">
      <input type="range"
             min="0"
             max={ modeNames.length - 1 }
             value={ activeMode }
             onChange={ (evt) => changeHandler(evt.target.valueAsNumber) } >
      </input>
      <div className="displayPanes">
        { displayPanes }
      </div>
      <div className="activeModeName">
        { modeNames[activeMode] }
      </div>
    </div>
  );
};

export default ModeControls;