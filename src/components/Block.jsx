
import React from "react";
import "../App.css";
function Block({ mark, changeMarks, position }) {
  return (
    <div
      className={`block mark${mark}`}
      onClick={() => changeMarks(position)}
    ></div>
  );
}

export default Block
