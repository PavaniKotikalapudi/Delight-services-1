import { Document, Packer, Paragraph, TextRun } from 'docx';
import React, { useState } from 'react';

import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

const DrawingTemplate = () => {
  const [textBoxes, setTextBoxes] = useState([]);
  const [inputData, setInputData] = useState({ label: '', value: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const addTextBox = () => {
    if (inputData.label && inputData.value) {
      setTextBoxes((prev) => [...prev, inputData]);
      setInputData({ label: '', value: '' }); // Clear inputs
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    textBoxes.forEach((box, index) => {
      doc.text(`${box.label}: ${box.value}`, 10, 10 + index * 10);
    });
    doc.save('report.pdf');
  };

  const exportToWord = () => {
    const doc = new Document();
    textBoxes.forEach((box) => {
      doc.addSection({
        children: [
          new Paragraph({
            children: [new TextRun(`${box.label}: ${box.value}`)],
          }),
        ],
      });
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'report.docx');
    });
  };

  return (
    <div>
      <h2>Drawing Template</h2>
      <input type="text" name="label" placeholder="Enter label" value={inputData.label} onChange={handleInputChange} />
      <input type="text" name="value" placeholder="Enter value" value={inputData.value} onChange={handleInputChange} />
      <button onClick={addTextBox}>Add Text Box</button>
      <h3>Text Boxes:</h3>
      {textBoxes.map((box, index) => (
        <div key={index}><strong>{box.label}:</strong> {box.value}</div>
      ))}
      <div>
      <button onClick={exportToPDF}>Export to PDF</button> 
      </div>
      <div>
      <button onClick={exportToWord}>Export to Word</button>
      </div>
    </div>
  );
};

export default DrawingTemplate;
