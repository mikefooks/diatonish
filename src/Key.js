import React from "react";

const Key = (props) => {
  return (
    <div className={ props.keyName }>
      <h2>{ props.keyName }</h2>
    </div>
  );
};

export default Key;