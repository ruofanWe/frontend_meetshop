import React, { useState, useEffect } from "react";

export const Carousel = ({ images = [], active, onClick, className = '', style = {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images.length, currentIndex]);

  return (
    <div
      className={className}
      tabIndex={0}
      aria-pressed={active}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.stopPropagation();
          setCurrentIndex(prev => 
            prev === 0 ? images.length - 1 : prev - 1
          );
        } else if (e.key === "ArrowRight") {
          e.stopPropagation();
          setCurrentIndex(prev => 
            prev === images.length - 1 ? 0 : prev + 1
          );
        }
      }}
      style={{
        position: "relative",
        width: "300px",
        padding: "10px",
        border: active ? "2px solid blue" : "1px solid gray",
        cursor: "pointer",
        ...style
      }}
    >
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <button
        aria-label="Previous slide"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentIndex(prev => 
            prev === 0 ? images.length - 1 : prev - 1
          );
        }}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          cursor: "pointer",
        }}
      >
        &#10094;
      </button>
      <button
        aria-label="Next slide"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentIndex(prev => 
            prev === images.length - 1 ? 0 : prev + 1
          );
        }}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          cursor: "pointer",
        }}
      >
        &#10095;
      </button>
      <div
        style={{
          position: "relative",
          marginTop: "10px",
          textAlign: "center",
        }}
      >
        {images.map((_, index) => (
          <span
            key={index}
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              margin: "0 2px",
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? "#333" : "#bbb",
            }}
          />
        ))}
      </div>
    </div>
  );
};
