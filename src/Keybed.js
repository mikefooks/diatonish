import React from "react";
import { getScale } from "./Theory";
import Key from "./Key";

const Keybed = ({octaves, modeIdx, root}) => {
  const activeScale = getScale(octaves, modeIdx, root);
  const keys = activeScale.map(keyName => {
    return <Key keyName={ keyName } />
  });

  return (
    <div className="keybed">
      { keys }
    </div>
  );
};

export default Keybed;