import React from "react";

import { ImageSizeInput } from "./ImageSizeInput";

export const ImageEditor = ({ src = "", width, height, onChange, className = '', style = {} }) => (
  <div className={className} style={style}>
    <div>
      <label>圖片網址:</label>
      <input
        type="text"
        value={src}
        onChange={(e) => onChange({ src: e.target.value })}
        placeholder="請輸入圖片網址"
      />
    </div>

    <ImageSizeInput
      label="寬度"
      value={width}
      onChange={(value) => onChange({ width: value })}
    />

    <ImageSizeInput
      label="高度"
      value={height}
      onChange={(value) => onChange({ height: value })}
    />
  </div>
);
