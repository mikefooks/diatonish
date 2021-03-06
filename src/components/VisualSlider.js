import React from "react";


const VisualSlider = (props) => {
  let { name, values, activeValue, changeHandler } = props;

  let displayPanes = values.map((val, idx) => {
    let active = idx == activeValue ? "active" : "";
    let classes = `${name}__displayPane ${active}`.trimEnd();

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
    <div className={ `${name}__visualSlider` }>
      <input type="range"
              min="0"
              max={ values.length - 1 }
              value={ activeValue }
              onChange={ (evt) => changeHandler(evt.target.valueAsNumber) } >
      </input>
      <div class="displayPanes">
        { displayPanes }
      </div>
    </div>
  );
};

export default VisualSlider;