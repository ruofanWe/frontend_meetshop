import React, { useState } from "react";
import debounce from 'lodash-es/debounce';

export const ImageSizeInput = ({ label, value, onChange, className = '', style = {} }) => {
  const [error, setError] = useState("");

  const handleChange = debounce((newValue) => {
    if (!newValue || /^\s*\d+\s*(px)?\s*$/.test(newValue)) {
      setError("");
      onChange(newValue);
    } else {
      setError(`請輸入有效的格式，例如: 100px`);
    }
  }, 500);

  return (
    <div className={className} style={style}>
      <label>{label}</label>
      <input
        type="text"
        placeholder="例如: 100px"
        value={value || ""}
        onChange={(e) => handleChange(e.target.value)}
      />
      {error && <div>{error}</div>}
      <div>支援的單位: {["px"].join(", ")}</div>
    </div>
  );
}; 