import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useProvided } from 'nonaction';
import { TextContainer } from '../../Container';
import Previewer from './Previewer';
import Editor from './Editor';
import DragBar from './DragBar.js';
import 'github-markdown-css';
import useDrop from '../../Container/Hooks/useDrop.js';
import uploadFile from '../../Lib/uploadFile.js';

const Markdown = ({ className }) => {
  const [text, setText] = useProvided(TextContainer);
  const [isDrag, setDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [width, setWidth] = useState(window.innerWidth / 2);
  const markdownRef = useRef(null);
  const [uploading, isOver] = useDrop(markdownRef, uploadFile);
  // Partial fileText & text

  useEffect(() => {
    const handleMouseUp = () => setDrag(false);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  // The state `isDrag` must be false, when mouse up!
  // So we listen it in window! (Seems ugly, but it just works ha.)
  return (
    <div
      ref={markdownRef}
      style={{ opacity: isOver || uploading ? 0.5 : 1 }}
      className={className + " editor-container"}
      onMouseMove={e => {
        if (!isDrag) return;
        const pageX = e.nativeEvent.pageX;
        setWidth(pageX - startX);
      }}
    >
      <Editor className="no-print markdown-editor" width={width} setText={setText} />
      <DragBar
        className="no-print"
        isDrag={isDrag}
        setDrag={setDrag}
        setStartX={setStartX}
      />
      <Previewer>{text}</Previewer>
    </div>
  );
};

export default styled(Markdown)`
  * {
    font-family:  "Patrick Hand", "Just Another Hand", "Shadows Into Light", cursive;
    box-sizing: border-box;
    
  }
  /* ---------------- Base ---------------- */
body {
  font-family: "Patrick Hand", "Just Another Hand", "Shadows Into Light", cursive;
  background: #fffefa;
  color: #2d2d2d;
  line-height: 1.6;
  padding: 40px 28px;
  max-width: 750px;
  margin: 0 auto;
  font-size: 19px; /* handwriting needs slightly larger size */
}

/* ---------------- Headings ---------------- */
h1, h2, h3, h4 {
  font-family: "Just Another Hand", cursive;
  font-weight: 400;
  letter-spacing: 0.5px;
  color: #1d1d1d;
}

h1 {
  font-size: 2.8rem;
  margin-bottom: 0.3rem;
  border-bottom: 2px dashed #ddd;
  padding-bottom: 0.3rem;
}

h2 {
  font-size: 2.2rem;
  margin-top: 2rem;
  margin-bottom: 0.4rem;
}

h3 {
  font-size: 1.8rem;
  margin-top: 1.2rem;
  margin-bottom: 0.3rem;
}

/* ---------------- Paragraphs ---------------- */
p {
  margin: 0.7rem 0;
}

/* ---------------- Lists ---------------- */
ul, ol {
  margin: 0.5rem 0 0.5rem 1.2rem;
  padding-left: 1rem;
}

li {
  margin-bottom: 0.35rem;
}

/* ---------------- Blockquotes ---------------- */
blockquote {
  border-left: 3px dashed #d0cfc7;
  padding: 0.6rem 1rem;
  margin: 1rem 0;
  font-size: 0.98em;
  background: #fffdf6;
  border-radius: 6px;
}

/* ---------------- Inline Code ---------------- */
code {
  background: #fff2c2;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Fira Code", monospace;
  font-size: 0.86em;
}

/* ---------------- Code Blocks ---------------- */
pre {
  background: #fff9d6;
  border: 1px dashed #e1d8a3;
  padding: 12px 16px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.92em;
}

/* ---------------- Tables ---------------- */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.92em;
}

th, td {
  border: 1px dashed #ccc;
  padding: 8px 12px;
}

th {
  background: #fff8e6;
}

/* ---------------- HR ---------------- */
hr {
  border: none;
  border-top: 2px dashed #e6e6e6;
  margin: 2rem 0;
}

/* ---------------- Images ---------------- */
img {
  max-width: 100%;
  display: block;
  margin: 1rem auto;
  border-radius: 8px;
}

/* ---------------- PDF Page Setup ---------------- */
@page {
  margin: 28mm 16mm;
}

  height: calc(100% - 40px);
  display: flex;
  
`;
