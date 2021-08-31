import React from "react";

import { xTranslate } from "../lib/xTranslations";


const blackKeys = [ 1, 3, 6, 8, 10 ];

function isBlack(keyId) {
  return blackKeys.includes(keyId % 12);
}

function getFillColor(blackKey, isActive) {
  if (!isActive) {
    return "url(#inactive_fill)";
  }
  return blackKey ? "#000" : "#fff";
}

function textElRender(keyId, isActive, blackKey) {
  if (!isActive) {
    return null;
  }
  return (
    <text
      x="40%"
      y="80%"
      fill={ blackKey ? "#fff" : "#000" }>
        { keyId.split("_")[0] }
    </text>
  );
}

const Key = ({ keyId, keyName, isActive }) => {
  let blackKey = isBlack(keyId);

  return (
    <svg 
      x={ xTranslate(keyId) }
      y={ 0 }
      width={ blackKey ? 80 : 100 }
      height={ blackKey ? 400 : 600 }>
      <rect
        id={ "key_" + keyId }
        width="100%"
        height="100%"
        x={ 0 }
        y={ 0 }
        fill={ getFillColor(blackKey, isActive) }
        fillOpacity={1}
        strokeWidth={ isActive ? 1 : 0 }
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}/>
        { textElRender(keyName, isActive, blackKey) }
    </svg>
  );
}

export default Key;