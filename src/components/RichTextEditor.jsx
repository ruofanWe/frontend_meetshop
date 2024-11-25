import React, { useCallback, useEffect, useRef, useState } from "react";

export const RichTextEditor = ({ 
  text, 
  onTextChange, 
  className = '', 
  style = {} 
}) => {
  const editorRef = useRef(null);
  const selectionRef = useRef({ start: 0, end: 0 });
  const [isComposing, setIsComposing] = useState(false);

  const getCaretPosition = useCallback((element) => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) {
      return { start: 0, end: 0 };
    }

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.startContainer, range.startOffset);
    const start = preCaretRange.toString().length;

    preCaretRange.setEnd(range.endContainer, range.endOffset);
    const end = preCaretRange.toString().length;

    return { start, end };
  }, []);

  const setCaretPosition = useCallback((element, start, end) => {
    const range = document.createRange();
    const selection = window.getSelection();
    let charCount = 0;
    const nodeStack = [element];

    while (nodeStack.length > 0) {
      const node = nodeStack.pop();
      if (node.nodeType === Node.TEXT_NODE) {
        const nodeLength = node.length;
        if (charCount + nodeLength >= start) {
          range.setStart(node, start - charCount);
          if (charCount + nodeLength >= end) {
            range.setEnd(node, end - charCount);
            break;
          }
        }
        charCount += nodeLength;
      } else {
        for (let i = node.childNodes.length - 1; i >= 0; i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    selection.removeAllRanges();
    selection.addRange(range);
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = text || "";
      setCaretPosition(
        editorRef.current,
        selectionRef.current.start,
        selectionRef.current.end
      );
    }
  }, [text, setCaretPosition]);

  const handleInput = useCallback(() => {
    if (editorRef.current && !isComposing) {
      selectionRef.current = getCaretPosition(editorRef.current);
      onTextChange(editorRef.current.innerHTML);
    }
  }, [getCaretPosition, onTextChange, isComposing]);

  const insertLineBreak = useCallback(() => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    // Create and insert BR element
    const br = document.createElement('br');
    range.deleteContents();
    range.insertNode(br);
    
    // Create an empty text node and insert it after the BR
    const textNode = document.createTextNode('\u200B');
    range.setStartAfter(br);
    range.insertNode(textNode);
    
    // Move cursor after the BR
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Scroll the cursor into view
    const rect = range.getBoundingClientRect();
    const container = editorRef.current;
    
    if (container) {
      const containerRect = container.getBoundingClientRect();
      if (rect.bottom > containerRect.bottom) {
        container.scrollTop = container.scrollTop + (rect.bottom - containerRect.bottom) + 20;
      }
    }
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey && !isComposing) {
        e.preventDefault();
        insertLineBreak();
        handleInput();
      }
    },
    [handleInput, insertLineBreak, isComposing]
  );

  const execCommand = useCallback(
    (command, value = null) => {
      document.execCommand(command, false, value);
      editorRef.current?.focus();
      handleInput();
    },
    [handleInput]
  );

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);

  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false);
    handleInput();
  }, [handleInput]);

  return (
    <div className={className} style={style}>
      <div>
        <button onClick={() => execCommand("bold")}>Bold</button>
        <button onClick={() => execCommand("italic")}>Italic</button>
        <button onClick={() => execCommand("underline")}>Underline</button>
        <button onClick={() => execCommand("insertUnorderedList")}>
          Bullet List
        </button>
        <button onClick={() => execCommand("insertOrderedList")}>
          Numbered List
        </button>
        <select onChange={(e) => execCommand("formatBlock", e.target.value)}>
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "100px",
          maxHeight: "200px",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          lineHeight: "1.5"
        }}
      />
    </div>
  );
};