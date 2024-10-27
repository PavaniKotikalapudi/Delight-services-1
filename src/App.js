import './App.css';

import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import DocumentWriter from './Components/DocumentWriter';
import DrawingTemplate from './Components/DrawingTemplate';
import Login from './Components/Login'; // Make sure to import your Login component
import OCR from './Components/Ocr';
import PincodeLookup from './Components/PincodeLookup';
import QRCodeBarcode from './Components/QRCodeBarcode';
import React from 'react';

// Import your DocumentWriter component

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="nav-button">Login</Link>
          <Link to="/editor" className="nav-button">Document Writer</Link>
          <Link to="/template" className="nav-button">Design Template</Link>
          <Link to="/ocr" className="nav-button">OCR</Link>
          <Link to="/barcoder" className="nav-button">Qr CodeBarcoder</Link>
          <Link to="/data" className="nav-button">json data</Link>
          
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/editor" element={<DocumentWriter />} />
          <Route path="/template" element={<DrawingTemplate />} />
          <Route path="/ocr" element={<OCR />} />
          <Route path="/barcoder" element={<QRCodeBarcode />} />
          <Route path="/data" element={<PincodeLookup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
