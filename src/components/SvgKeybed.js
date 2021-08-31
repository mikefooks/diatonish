import React from "react";
import { Map } from "immutable";

import Key from "./Key";


const renderOrder = [
  0, 2, 4, 5, 7, 9, 11, // white keys
  1, 3, 6, 8, 10 // black keys
];

const SvgKeybed = ({ activeRoot, activeKeys, rootOnBottom }) => {
  const defaultOctaves = 4;

  let keyIds = [];
  for (let i = 0; i < defaultOctaves; i++) {
    for (let j = 0; j < 12; j++) {
      keyIds.push(renderOrder[j] + (12 * i));
    }
  }

  const keyEls = keyIds.map((key, _) => {
    let isActive = activeKeys.hasOwnProperty(key);
    return <Key
            keyId={ key }
            keyName={ activeKeys[key] }
            isActive={ isActive }
           />;
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1400}
      height={600}
      viewBox="0 0 1400 600"
      id="keybed">
      <pattern id="inactive_fill"
           width="16" height="20"
           patternUnits="userSpaceOnUse"
           patternTransform="rotate(45 50 50)"
           >
        <line stroke="#676767" strokeWidth="12px" x1="6" x2="6" y2="20"/>             
        <line stroke="#a6a6a6" strokeWidth="18px" x1="16" x2="16" y2="20"/>
      </pattern>
      <g id="keybed_group"
         transform={ rootOnBottom ? "translate(" + rootTranslations.get(activeRoot) + ")" : "" } 
         stroke="#000">
        { keyEls }
      </g>
    </svg>
  );
}

export default SvgKeybed;