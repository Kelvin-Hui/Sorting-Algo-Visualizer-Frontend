import React from "react";

function Array_Visualizer({ array }) {
  let w = (window.innerWidth * 0.8 - 10) * 0.95;

  let bar_width = (w - array.length) / array.length;

  return (
    <div
      className="array_visualizer"
      style={{ height: `${window.innerHeight * 0.9}px` }}
    >
      {array.map((value, idx) => {
        return (
          <div
            id="bar"
            key={idx}
            style={{
              height: `${value}px`,
              width: `${bar_width}px`,
              display: "inline-flex",
              margin: `${0.5 * bar_width}px`,
              backgroundColor: "#54a0ff",
              position: "absolute",
              bottom: `${w * 0.1}px`,
              left: `${bar_width * idx + idx}px`,
            }}
          ></div>
        );
      })}
    </div>
  );
}

export default Array_Visualizer;
