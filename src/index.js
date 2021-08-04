import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import Things from "./music_theory";

window.Things = Things;

ReactDOM.render(
  <App/>,
  document.querySelector(".yo")  
);
