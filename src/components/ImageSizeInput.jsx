import debounce from 'lodash-es/debounce';
import React, { useState } from "react";

export const ImageSizeInput = ({ label, value, onChange, className = '', style = {} }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [error, setError] = useState("");

  const handleChange = debounce((newValue) => {
    // Allow empty value or valid format
    if (!newValue || /^\s*\d+\s*(px)?\s*$/.test(newValue)) {
      setError("");
      // If empty, pass null to clear the value
      onChange(newValue ? newValue : null);
    } else {
      setError(`請輸入有效的格式，例如: 100px`);
    }
  }, 500);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    handleChange(newValue);
  };

  return (
    <div className={className} style={style}>
      <label>{label}</label>
      <input
        type="text"
        placeholder="例如: 100px"
        value={inputValue}
        onChange={handleInputChange}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>支援的單位: {["px"].join(", ")}</div>
    </div>
  );
};