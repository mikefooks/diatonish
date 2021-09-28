import React from "react";

import { defaultOctaves } from "../config";
import { xTranslations } from "../lib/xTranslations";
import Key from "./Key";


const renderOrder = [
  0, 2, 4, 5, 7, 9, 11, // white keys
  1, 3, 6, 8, 10 // black keys
];

const SvgKeybed = (props) => {
  const { activeRoot,
          activeKeys,
          chordMode,
          degreeMode,
          chordScaleDegrees,
          rootOnBottom } = props;

  // Since SVG uses a painter's model to determine z-order,
  // we need to order element rendering in such a way that black
  // keys are not rendered over.
  let keyIds = [];

  for (let i = 0; i < defaultOctaves; i++) {
    for (let j = 0; j < 12; j++) {
      keyIds.push(renderOrder[j] + (12 * i));
    }
  }

  const keyEls = keyIds.map((key, _) => {
    let isActive = activeKeys.hasOwnProperty(key);
    let keyName = isActive ? activeKeys[key].name : "";

    // Chord display details are irrelevant if showChord display option
    // is false.

    let isChordTone, chordToneIdx;

    if (chordMode > 0) {
      isChordTone = isActive && chordScaleDegrees.indexOf(activeKeys[key].degree) >= 0;
      chordToneIdx = isActive && chordScaleDegrees.indexOf(activeKeys[key].degree);
    } else {
      isChordTone = false;
      chordToneIdx = 0;
    }

    let degree;

    if (isActive) {
      if (degreeMode == 0) {
        degree = "";
      } else if (degreeMode == 1) {
        degree = activeKeys[key].degree;
      } else if (degreeMode == 2) {
        degree = isChordTone ? (chordToneIdx * 2) + 1 : "";
      }  
    }

    return <Key keyId={ key }
                keyName={ keyName }
                degree={ degree }
                isChordTone={ isChordTone }
                chordToneIdx={ isChordTone ? chordToneIdx : -1 }
                isActive={ isActive } 
                isRoot={ activeRoot == (key % 12) } />;
  });

  // Scale factor .8571 takes it from 1400px wide to 1200px.

  let translateValue = rootOnBottom ? "translate(" + (-1 * xTranslations[activeRoot]) + ")" : "";
  translateValue += " scale(.8571)";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1200"
      height="514"
      viewBox="0 0 1200 514"
      id="keybed">
      <pattern id="inactive_fill"
               width="16" height="20"
               patternUnits="userSpaceOnUse"
               patternTransform="rotate(45 50 50)">
        <line stroke="#676767" strokeWidth="12px" x1="6" x2="6" y2="20"/>             
        <line stroke="#a6a6a6" strokeWidth="18px" x1="16" x2="16" y2="20"/>
      </pattern>
      <g id="keybed_group"
         transform={ translateValue } 
         stroke="#000">
        { keyEls }
      </g>
    </svg>
  );
}

export default SvgKeybed;