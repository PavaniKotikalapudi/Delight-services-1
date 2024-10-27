import React, { useState } from 'react';

import Tesseract from 'tesseract.js';

const OCR = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleOCR = () => {
    if (image) {
      setLoading(true);
      setText(''); // Reset text
      setError(''); // Reset error

      Tesseract.recognize(
        image,
        'eng',
        {
          logger: (info) => console.log(info), // Debug print
        }
      )
        .then(({ data: { text } }) => {
          setText(text);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Error recognizing text');
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <h2>OCR Scanner</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleOCR}>Scan Document</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {text && (
        <div>
          <h3>Scanned Text:</h3>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default OCR;
