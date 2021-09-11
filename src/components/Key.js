import React from "react";

import { xTranslate } from "../lib/xTranslations";


const blackKeys = [ 1, 3, 6, 8, 10 ];

function isBlack(keyId) {
  return blackKeys.includes(keyId % 12);
}

function getFillColor(blackKey, isActive, isChordTone) {
  if (!isActive) {
    return "url(#inactive_fill)";
  }

  if (isChordTone) {
    return "#f0a";
  }

  return blackKey ? "#000" : "#fff";
}

function isRootRing(isRoot) {
  if (!isRoot) {
    return null;
  }
  return <circle cy="80%"
                 cx="40%"
                 r="20px"
                 fill="none"
                 stroke="orange"
                 strokeWidth="2px"/>;
}

function keyNameEl(keyName, isActive, blackKey) {
  if (!isActive) {
    return null;
  }
  return (
    <text
      x="40%"
      y="80%"
      fill={ blackKey ? "#fff" : "#000" }>
        { keyName }
    </text>
  );
}

function scaleDegreeEl(scaleDegree, isActive, blackKey) {
  if (!isActive) {
    return null;
  }
  return (
    <text
      x="40%"
      y="90%"
      fill={ blackKey ? "#fff" : "#000" }>
        { scaleDegree }
    </text>
  );
}

const Key = (props) => {
  let { keyId, keyName, scaleDegree, isActive, isRoot, isChordTone } = props;
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
        fill={ getFillColor(blackKey, isActive, isChordTone) }
        fillOpacity={1}
        strokeWidth={ isActive ? 1 : 0 }
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}/>
      { isRootRing(isRoot) }
      { keyNameEl(keyName, isActive, blackKey) }
      { scaleDegreeEl(scaleDegree, isActive, blackKey) }
    </svg>
  );
}

export default Key;