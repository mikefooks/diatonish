import React from "react";


const ModeControls = (props) => {
  let { values, activeValue, changeHandler } = props;

  let displayPanes = values.map((val, idx) => {
    let active = idx == activeValue ? "active" : "";
    let classes = `displayPane ${active}`.trimEnd();

    return (
      <div className={ classes }
           onClick={ () => changeHandler(idx) }>
        <h3>
          { val }
        </h3>
      </div>
    );
  });

  return (
    <div className={ "modeControls" }>
      <input type="range"
             min="0"
             max={ values.length - 1 }
             value={ activeValue }
             onChange={ (evt) => changeHandler(evt.target.valueAsNumber) } >
      </input>
      <div className="displayPanes">
        { displayPanes }
      </div>
    </div>
  );
};

const ModeDisplay = (props) => {
  return <div className="modeDisplay">
    <h2>{ props.activeMode }</h2>
  </div>;
}

export default ModeControls;