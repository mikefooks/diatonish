import React from "react";
import SvgKeybed from "./keybed_svg";
import { getScale } from "./Theory";

let defaultState = { 
  octaves: 4,
  modeIdx: 0,
  root: "Eb"
};

let activeKeys = getScale(4, 0, "Eb");

class App extends React.Component {
  render() {
	  return (
		  <div id="appWindow">
			  <SvgKeybed activeKeys={ activeKeys } />
			</div>
		);
  }
}

export default App;