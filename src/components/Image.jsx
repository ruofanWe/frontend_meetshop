import React, { useState } from "react";

export const Image = ({
  src,
  alt = "",
  width,
  height,
  onClick,
  active,
  className = '',
  style = {}
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      style={{
        display: "inline-block",
        position: "relative",
        padding: "10px",
        border: active ? "2px solid blue" : "1px solid gray",
        cursor: "pointer",
        ...style
      }}
    >
      {isLoading && (
        <div 
          role="status" 
          aria-label="載入中"
        >
          載入中...
        </div>
      )}
      <img
        src={src}
        alt={alt}
        aria-hidden={imageError}
        onError={(e) => {
          setImageError(true);
          setIsLoading(false);
          e.target.src = "https://via.placeholder.com/150";
        }}
        onLoad={() => setIsLoading(false)}
        style={{
          width: width ? `${width}px` : "auto",
          height: height ? `${height}px` : "auto",
          opacity: isLoading ? 0 : 1,
        }}
      />
      {imageError && (
        <div 
          role="alert" 
          aria-label="圖片載入失敗"
        >
          圖片載入失敗
        </div>
      )}
    </div>
  );
};
