import React from "react";


const rootNames = [
  "C", "C\u266F/D\u266D", "D", "D\u266F/E\u266D", "E", "F",
  "F\u266F/G\u266D", "G", "G\u266F/A\u266D", "A", "A\u266F/B\u266D", "B" 
];

const chromaticScale = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
];

const circleOfFifths = [
  0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5 
];

const RootSlider = (props) => {
  const { rootIncrMode,
          activeRoot,
          updateRootFn } = props;

  const displayValues = rootIncrMode == 0 ? chromaticScale : circleOfFifths;
  const activeValueIdx = rootIncrMode == 0 ?
                         activeRoot : circleOfFifths.indexOf(activeRoot);

  const displayPanes = displayValues.map((val, _) => {
    let active = val == activeRoot ? "active" : "";
    let classes = `displayPane ${active}`.trimEnd();

    return (
      <div className={ classes }
           onMouseDown={ () => updateRootFn(val) }>
        <h3>
          { rootNames[val] }
        </h3>
      </div>
    );
  });

  return (
    <div className="rootControl--input">
      <input type="range"
              min="0"
              max={ displayValues.length - 1 }
              value={ activeValueIdx }
              onChange={ (evt) => {
                let targetVal = evt.target.valueAsNumber;
                if (rootIncrMode == 0) {
                  updateRootFn(chromaticScale[targetVal]);
                } else {
                  updateRootFn(circleOfFifths[targetVal]); 
                } } } />
      <div className="displayPanes">
        { displayPanes }
      </div>
    </div>
  );
};

const RootControls = (props) => {
  const { rootIncrMode, 
          activeRoot,
          updateRootFn } = props;

  return (
    <div className="rootControl">
      <div className="appLabel">
        <h1>diaton<i>ik</i></h1>
      </div>
      <RootSlider rootIncrMode={ rootIncrMode }
                  activeRoot={ activeRoot }
                  updateRootFn={ updateRootFn } />
    </div>
  );
};

export default RootControls;
