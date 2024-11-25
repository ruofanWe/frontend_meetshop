import React from "react";

export const DraggableList = ({ items, className = '', style = {} }) => (
  <div
    role="list"
    aria-label="Draggable components list"
    className={className}
    style={style}
  >
    {items.map(({ type, label, defaultProps, thumbnail }) => (
      <div
        key={type}
        role="listitem"
        aria-label={`Draggable ${label}`}
        draggable
        onDragStart={(event) => {
          event.dataTransfer.setData(
            "application/json",
            JSON.stringify({ type, defaultProps })
          );
        }}
        style={{
          display: "flex",
          alignItems: "center",
          margin: "10px",
          padding: "10px",
          border: "1px solid black",
          cursor: "move",
        }}
      >
        {thumbnail}
        {label}
      </div>
    ))}
  </div>
);
