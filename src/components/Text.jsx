import React from "react";
import DOMPurify from 'dompurify';

export const Text = ({
  text,
  onClick,
  active,
  className = '',
  style = {}
}) => (
  <div
    className={className}
    role="button"
    tabIndex={0}
    aria-pressed={active}
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    }}
    style={{
      display: "block",
      position: "relative",
      margin: "10px 0",
      padding: "10px",
      border: active ? "2px solid blue" : "1px solid gray",
      cursor: "pointer",
      ...style
    }}
  />
);
