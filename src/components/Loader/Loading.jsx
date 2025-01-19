import React from "react";
import "./loader.css";

function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
