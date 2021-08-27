import React from "react";
import { Map } from "immutable";

import { getKeyList } from "./Theory";


const keyNames = getKeyList(4, "C");

const xTranslations = {
  "C_1": "0",
  "D_1": "100",
  "E_1": "200",
  "F_1": "300",
  "G_1": "400",
  "A_1": "500",
  "B_1": "600",
  "C_2": "700",
  "D_2": "800",
  "E_2": "900",
  "F_2": "1000",
  "G_2": "1100",
  "A_2": "1200",
  "B_2": "1300",
  "C_3": "1400",
  "D_3": "1500",
  "E_3": "1600",
  "F_3": "1700",
  "G_3": "1800",
  "A_3": "1900",
  "B_3": "2000",
  "C_4": "2100",
  "D_4": "2200",
  "E_4": "2300",
  "F_4": "2400",
  "G_4": "2500",
  "A_4": "2600",
  "B_4": "2700",
  "Db_1": "60",
  "Eb_1": "160",
  "Gb_1": "360",
  "Ab_1": "460",
  "Bb_1": "560",
  "Db_2": "760",
  "Eb_2": "860",
  "Gb_2": "1060",
  "Ab_2": "1160",
  "Bb_2": "1260",
  "Db_3": "1460",
  "Eb_3": "1560",
  "Gb_3": "1760",
  "Ab_3": "1860",
  "Bb_3": "1960",
  "Db_4": "2160",
  "Eb_4": "2260",
  "Gb_4": "2460",
  "Ab_4": "2560",
  "Bb_4": "2660",
};

const rootTranslations = Map({
  "C": 0,
  "D": -100,
  "E": -200,
  "F": -300,
  "G": -400,
  "A": -500,
  "B": -600,
  "Db": -60,
  "Eb": -160,
  "Gb": -360,
  "Ab": -460,
  "Bb": -560
});

const Key = ({ keyId, blackKey, isActive }) => {
  
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

  return (
    <svg 
      x={ xTranslations[keyId] }
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
        { textElRender(keyId, isActive, blackKey) }
    </svg>
  );
}

const SvgKeybed = ({ activeRoot, activeKeys, rootOnBottom }) => {
  const keys = Object.keys(xTranslations).map((val, idx) => {
    let isActive = activeKeys.includes(val);

    return <Key
            keyId={ val }
            blackKey={ idx > 27 ? true : false }
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
        { keys }
      </g>
    </svg>
  );
}

export default SvgKeybed;