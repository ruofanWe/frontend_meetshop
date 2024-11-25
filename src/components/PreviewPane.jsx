import React from "react";
import { match } from "ts-pattern";

import { Text } from "./Text";
import { Image } from "./Image";
import { Carousel } from "./Carousel";

export const PreviewPane = ({ 
  items, 
  onDrop, 
  onDragOver, 
  onSelect,
  className = '',
  style = {}
}) => (
  <div
    role="region"
    tabIndex={-1}
    aria-label="預覽區域"
    className={className}
    style={{
      minHeight: "400px",
      padding: "10px",
      border: "1px solid gray",
      outline: "none",
      ...style
    }}
    onDragOver={onDragOver}
    onDrop={onDrop}
  >
    {items.length === 0 ? (
      <div 
        role="status"
        aria-label="空預覽區域"
      >
        請將左邊的元件拖曳到此處以開始編輯
      </div>
    ) : (
      items.map(({ id, type, props, active }) => 
        match(type)
          .with("text", () => (
            <Text
              key={id}
              role="region"
              aria-label="text component"
              active={active}
              onClick={() => onSelect(id)}
              {...props}
            />
          ))
          .with("image", () => (
            <Image
              key={id}
              role="region"
              aria-label="image component"
              active={active}
              onClick={() => onSelect(id)}
              {...props}
            />
          ))
          .with("carousel", () => (
            <Carousel
              key={id}
              role="region"
              aria-label="carousel component"
              active={active}
              onClick={() => onSelect(id)}
              {...props}
            />
          ))
          .otherwise(() => null)
      )
    )}
  </div>
);
