import React from "react";

export const CarouselEditor = ({ images = [], onChange }) => (
  <div>
    <label>Carousel Images:</label>
    {images.map((img, index) => (
      <div key={index}>
        <input
          type="text"
          value={img}
          onChange={(e) => {
            const newImages = [...images];
            newImages[index] = e.target.value;
            onChange({ images: newImages });
          }}
        />
        <button
          onClick={() => {
            const newImages = images.filter(
              (_, i) => i !== index
            );
            onChange({ images: newImages });
          }}
        >
          Remove
        </button>
      </div>
    ))}
    <button
      onClick={() => {
        const newImages = [
          ...images,
          "https://via.placeholder.com/300x200",
        ];
        onChange({ images: newImages });
      }}
    >
      Add Image
    </button>
  </div>
);
