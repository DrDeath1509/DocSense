import React, { useState } from 'react';
import Navbar from '../Helper/Nav';
import { FaFileSignature } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import { successToast, rejectedToast } from '../Helper/Alerts';

const PDFMaker = () => {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('my-document.pdf');

  const handleGeneratePDF = () => {
    if (!text.trim()) {
      rejectedToast('Missing Content', 'Please enter some text before generating a PDF.');
      return;
    }

    const doc = new jsPDF();
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 15, 20);
    doc.save(fileName);

    successToast('PDF Created', `Your file "${fileName}" has been downloaded.`);
  };

  return (
    <div className="word-counter-bg min-vh-100 d-flex flex-column">
      <Navbar />

      <div className="container d-flex flex-column align-items-center justify-content-center flex-grow-1 py-5">
        <div
          className="card shadow-lg border-0 rounded-4 p-4 w-100"
          style={{
            maxWidth: '700px',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-4">
            <div
              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
              style={{
                backgroundColor: '#e6f9ee',
                width: '60px',
                height: '60px',
              }}
            >
              <FaFileSignature size={28} className="text-success" />
            </div>
            <h4 className="fw-bold text-dark mb-1">PDF Maker</h4>
            <p className="text-muted small mb-0">
              Write, format, and download your own custom PDF files instantly.
            </p>
          </div>

          {/* Filename Input */}
          <label className="form-label fw-semibold small text-muted mb-1">File Name</label>
          <input
            type="text"
            className="form-control mb-3 rounded-3"
            placeholder="Enter file name (e.g., notes.pdf)"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />

          {/* Textarea */}
          <label className="form-label fw-semibold small text-muted mb-1">Your Content</label>
          <textarea
            className="form-control mb-4 rounded-3 shadow-sm"
            rows="10"
            placeholder="Write or paste your content here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ resize: 'none', backgroundColor: '#fcfcfc' }}
          />

          {/* Generate Button */}
          <div className="text-center">
            <button
              className="btn btn-success rounded-pill px-5 py-2 shadow-sm"
              onClick={handleGeneratePDF}
              style={{
                fontWeight: '500',
                letterSpacing: '0.3px',
                transition: '0.2s ease-in-out',
              }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            >
              ✨ Generate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFMaker;
