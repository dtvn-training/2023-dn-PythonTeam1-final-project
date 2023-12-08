import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default Loading;
