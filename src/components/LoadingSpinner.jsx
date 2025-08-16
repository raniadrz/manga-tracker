import { useState } from 'react';

function ThreeDot({ variant = "pulsate", color = "#f91dbb", size = "large", text = "", textColor = "" }) {
  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32
  };

  const dotSize = sizeMap[size] || 32;
  const dotColor = color || "#f91dbb";
  const textColorValue = textColor || color || "#f91dbb";

  return (
    <div className="three-dot-container">
      <div className={`three-dots ${variant}`} style={{ '--dot-color': dotColor, '--dot-size': `${dotSize}px` }}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      {text && (
        <p className="loading-text" style={{ color: textColorValue }}>
          {text}
        </p>
      )}
    </div>
  );
}

function LoadingSpinner({ size = "large", className = '', text = "Loading..." }) {
  return (
    <div className={`loading-spinner-container ${className}`}>
      <ThreeDot 
        variant="pulsate" 
        color="#f91dbb" 
        size={size} 
        text={text} 
        textColor="#FFFF"
      />
    </div>
  );
}

export default LoadingSpinner;
export { ThreeDot };
