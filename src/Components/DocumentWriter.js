import React, { useEffect, useRef, useState } from 'react';

const DocumentWriter = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');

  // Function to handle formatting
  const formatText = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  // Keyboard shortcuts handling
  const handleKeyDown = (e) => {
    if (e.ctrlKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          formatText('bold');
          break;
        case 'i':
          e.preventDefault();
          formatText('italic');
          break;
        case 'u':
          e.preventDefault();
          formatText('underline');
          break;
        case 's':
          e.preventDefault();
          autoSave();
          break;
        default:
          break;
      }
    }
  };

  // Auto-save function
  const autoSave = () => {
    localStorage.setItem('document', content);
    alert('Document auto-saved!');
  };

  // Load saved content from localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem('document');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  return (
    <div>
      <h2>Document Writer</h2>
      <div
        contentEditable
        ref={editorRef}
        onInput={(e) => setContent(e.target.innerHTML)}
        onKeyDown={handleKeyDown}
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '300px',
          borderRadius: '4px',
          overflowY: 'auto',
          marginTop: '10px',
        }}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => formatText('bold')}>Bold (Ctrl + B)</button>
        <button onClick={() => formatText('italic')}>Italic (Ctrl + I)</button>
        <button onClick={() => formatText('underline')}>Underline (Ctrl + U)</button>
        <button onClick={autoSave}>Save (Ctrl + S)</button>
      </div>
    </div>
  );
};

export default DocumentWriter;
