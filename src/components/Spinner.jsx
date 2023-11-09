// Spinner.jsx

import React from "react";
import "./Spinner.scss";

const Spinner = () => {
  return (
    <div className="balls " style={{position:"absolute", top:'30%', left:'55%'}}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
