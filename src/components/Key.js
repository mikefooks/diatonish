import React from "react";

import { xTranslate } from "../lib/xTranslations";


const blackKeys = [ 1, 3, 6, 8, 10 ];

function isBlack(keyId) {
  return blackKeys.includes(keyId % 12);
}

function getFillColor(blackKey, isActive, chordToneIdx) {
  if (!isActive) {
    return "url(#inactive_fill)";
  }

  switch (chordToneIdx) {
    case -1:
      break;
    case 0:
      return "rgb(255, 0, 0)";
    case 1:
      return "rgb(192, 0, 0)";
    case 2:
      return "rgb(127, 0, 0)";
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

function scaleDegreeEl(degree, isActive, blackKey) {
  if (!isActive) {
    return null;
  }
  return (
    <text
      x="40%"
      y="90%"
      fill={ blackKey ? "#fff" : "#000" }>
        { degree }
    </text>
  );
}

const Key = (props) => {
  const { keyId,
          keyName,
          degree,
          chordToneIdx,
          isActive,
          isRoot } = props;
  
  const blackKey = isBlack(keyId);

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
        fill={ getFillColor(blackKey, isActive, chordToneIdx) }
        fillOpacity={1}
        strokeWidth={ isActive ? 1 : 0 }
        strokeMiterlimit={4}
        strokeDasharray="none"
        strokeOpacity={1}/>
      { isRootRing(isRoot) }
      { keyNameEl(keyName, isActive, blackKey) }
      { scaleDegreeEl(degree, isActive, blackKey) }
    </svg>
  );
}

export default Key;