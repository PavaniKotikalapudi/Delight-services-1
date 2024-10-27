import { Document, ImageRun, Packer, Paragraph, TextRun } from 'docx'; // Ensure to import ImageRun
import React, { useEffect, useRef, useState } from 'react';

import JsBarcode from 'jsbarcode';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

// Correct import





const QRCodeBarcode = () => {
  const [inputText, setInputText] = useState('');
  const [barcodeValue, setBarcodeValue] = useState('');
  const [barcodeImgUrl, setBarcodeImgUrl] = useState('');
  const qrCodeRef = useRef(); // Reference for QR code

  const generateBarcode = () => {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, barcodeValue, { format: 'CODE128' });
    setBarcodeImgUrl(canvas.toDataURL('image/png'));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Convert QR code SVG to PNG using a canvas
    const svg = qrCodeRef.current.querySelector('svg');
    const canvas = document.createElement('canvas');
    const svgString = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const qrCodeImgUrl = canvas.toDataURL('image/png');
      
      doc.text(`QR Code:`, 10, 10);
      doc.addImage(qrCodeImgUrl, 'PNG', 10, 20, 50, 50);
      doc.text(`Barcode:`, 10, 80);
      doc.addImage(barcodeImgUrl, 'PNG', 10, 90, 50, 20);
      doc.save('output.pdf');
    };
    
    img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
  };

  const exportToWord = async () => {
    const doc = new Document();
    
    // Convert QR code SVG to PNG for Word export
    const svg = qrCodeRef.current.querySelector('svg');
    const canvas = document.createElement('canvas');
    const svgString = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const qrCodeImgUrl = canvas.toDataURL('image/png');
      
      // Add QR code image to Word document
      const qrCodeImage = await fetch(qrCodeImgUrl)
        .then(res => res.arrayBuffer())
        .then(buffer => new ImageRun({
          data: buffer,
          transformation: {
            width: 100, // Width in EMUs
            height: 100 // Height in EMUs
          }
        }));
      
      doc.addSection({
        children: [
          new Paragraph({
            children: [new TextRun('QR Code:')],
          }),
          new Paragraph({
            children: [qrCodeImage],
          }),
          new Paragraph({
            children: [new TextRun('Barcode:')],
          }),
          new Paragraph({
            children: [
              new ImageRun({
                data: await fetch(barcodeImgUrl).then(res => res.arrayBuffer()),
                transformation: {
                  width: 100, // Width in EMUs
                  height: 40 // Height in EMUs
                }
              }),
            ],
          }),
        ],
      });
      
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'output.docx');
      });
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
  };

  useEffect(() => {
    if (barcodeValue) {
      generateBarcode();
    }
  });

  return (
    <div>
      <h2>QR Code and Barcode Generator</h2>
      <div>
        <input
          type="text"
          placeholder="Enter text for QR Code"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div ref={qrCodeRef}>
          <QRCodeSVG value={inputText} size={128} />
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter value for Barcode"
          value={barcodeValue}
          onChange={(e) => setBarcodeValue(e.target.value)}
        />
        {barcodeImgUrl && <img src={barcodeImgUrl} alt="Barcode" />}
      </div>
      <button onClick={exportToPDF}>Export to PDF</button>
      <button onClick={exportToWord}>Export to Word</button>
      {inputText && (
        <img
          src={`data:image/png;base64,${qrCodeRef.current?.querySelector('canvas')?.toDataURL('image/png').split(',')[1]}`}
          alt="QR Code"
          style={{ display: 'block', marginTop: '20px' }}
        />
      )}
    </div>
  );
};

export default QRCodeBarcode;
