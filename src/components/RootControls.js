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


const RootControls = (props) => {
  const { rootDisplayMode, activeValue, changeHandler } = props;
  const values = rootDisplayMode == 0 ? chromaticScale : circleOfFifths;
  const activeValueIdx = rootDisplayMode == 0 ?
                         activeValue : circleOfFifths.indexOf(activeValue);

  const displayPanes = values.map((val, _) => {
    let active = val == activeValue ? "active" : "";
    let classes = `displayPane ${active}`.trimEnd();

    return (
      <div className={ classes }
           onClick={ () => changeHandler(val) }>
        <h3>
          { rootNames[val] }
        </h3>
      </div>
    );
  });

  return (
    <div className={ "rootControls" }>
      <input type="range"
              min="0"
              max={ values.length - 1 }
              value={ activeValueIdx }
              onChange={ (evt) => {
                let targetVal = evt.target.valueAsNumber;
                if (rootDisplayMode == 0) {
                  changeHandler(chromaticScale[targetVal]);
                } else {
                  changeHandler(circleOfFifths[targetVal]); 
                } } } />
      <div className="displayPanes">
        { displayPanes }
      </div>
    </div>
  );
};

export default RootControls;