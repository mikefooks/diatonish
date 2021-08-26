import React from "react";
import { Map } from "immutable";

import { getKeyList } from "./Theory";


const keyNames = getKeyList(4, "C");

const keyPaths = {
  "C_1": "M.5.5h100v600H.5z",
  "D_1": "M100.5.5h100v600h-100z",
  "E_1": "M200.5.5h100v600h-100z",
  "F_1": "M300.5.5h100v600h-100z",
  "G_1": "M400.5.5h100v600h-100z",
  "A_1": "M500.5.5h100v600h-100z",
  "B_1": "M600.5.5h100v600h-100z",
  "C_2": "M700.5.5h100v600h-100z",
  "D_2": "M800.5.5h100v600h-100z",
  "E_2": "M900.5.5h100v600h-100z",
  "F_2": "M1000.5.5h100v600h-100z", 
  "G_2": "M1100.5.5h100v600h-100z",
  "A_2": "M1200.5.5h100v600h-100z",
  "B_2": "M1300.5.5h100v600h-100z",
  "C_3": "M1400.5.5h100v600h-100z",
  "D_3": "M1500.5.5h100v600h-100z",
  "E_3": "M1600.5.5h100v600h-100z",
  "F_3": "M1700.5.5h100v600h-100z",
  "G_3": "M1800.5.5h100v600h-100z",
  "A_3": "M1900.5.5h100v600h-100z",
  "B_3": "M2000.5.5h100v600h-100z",
  "C_4": "M2100.5.5h100v600h-100z",
  "D_4": "M2200.5.5h100v600h-100z",
  "E_4": "M2300.5.5h100v600h-100z",
  "F_4": "M2400.5.5h100v600h-100z",
  "G_4": "M2500.5.5h100v600h-100z",
  "A_4": "M2600.5.5h100v600h-100z",
  "B_4": "M2700.5.5h100v600h-100z",
  "Db_1": "M60.5.5h80v400h-80z",
  "Eb_1": "M160.5.5h80v400h-80z",
  "Gb_1": "M360.5.5h80v400h-80z",
  "Ab_1": "M460.5.5h80v400h-80z",
  "Bb_1": "M560.5.5h80v400h-80z",
  "Db_2": "M760.5.5h80v400h-80z",
  "Eb_2": "M860.5.5h80v400h-80z",
  "Gb_2": "M1060.5.5h80v400h-80z",
  "Ab_2": "M1160.5.5h80v400h-80z",
  "Bb_2": "M1260.5.5h80v400h-80z",
  "Db_3": "M1460.5.5h80v400h-80z",
  "Eb_3": "M1560.5.5h80v400h-80z",
  "Gb_3": "M1760.5.5h80v400h-80z",
  "Ab_3": "M1860.5.5h80v400h-80z",
  "Bb_3": "M1960.5.5h80v400h-80z",
  "Db_4": "M2160.5.5h80v400h-80z",
  "Eb_4": "M2260.5.5h80v400h-80z",
  "Gb_4": "M2460.5.5h80v400h-80z",
  "Ab_4": "M2560.5.5h80v400h-80z",
  "Bb_4": "M2660.5.5h80v400h-80z"
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

  return <path
    id={ "keybed_" + keyId }
    fill={ getFillColor(blackKey, isActive) }
    fillOpacity={1}
    strokeWidth={ isActive ? 1 : 0 }
    strokeMiterlimit={4}
    strokeDasharray="none"
    strokeOpacity={1}
    d={ keyPaths[keyId] }
  />;
}

const SvgKeybed = ({ activeRoot, activeKeys, rootOnBottom }) => {
  const keys = Object.keys(keyPaths).map((val, idx) => {
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