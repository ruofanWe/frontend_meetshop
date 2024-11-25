import React from "react";
import { RichTextEditor } from "./RichTextEditor";

export const TextEditor = ({ text = "", onChange, className = '', style = {} }) => (
  <RichTextEditor
    text={text}
    className={className}
    style={style}
    onTextChange={onChange}
  />
);
