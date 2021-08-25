import React from "react";

const Key = (props) => {
  return (
    <div className={ props.keyName }
         style={{ display: "inline-block",
                  padding: "0 1em" }}>
      <h2>{ props.keyName }</h2>
    </div>
  );
};

export default Key;