import React from "react";
import "./LoadingAnimation.css"; // Import your CSS for styling the loading animation

function LoadingAnimation() {
  return (
    <div className="loading-screen">
      <div class="loading-container">
        <div class="loading-text">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingAnimation;
