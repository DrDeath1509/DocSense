import React, { useState } from 'react';
import Navbar from '../Helper/Nav';
import { FaFileAlt } from 'react-icons/fa';

const WordCounter = () => {
  const [text, setText] = useState('');

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim() !== '').length;

  return (
    <div className="word-counter-bg min-vh-100">
      <Navbar />

      <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
        <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="text-center mb-3">
            <FaFileAlt size={32} className="text-primary mb-2" />
            <h4 className="fw-bold mb-0">Word Counter</h4>
            <p className="text-muted small mb-3">Type or paste your text below to get word, character, and sentence counts instantly.</p>
          </div>

          {/* Textarea */}
          <textarea
            className="form-control rounded-3 mb-4"
            rows="7"
            placeholder="Start typing your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              resize: 'none',
              borderColor: '#dee2e6',
              boxShadow: 'none',
              fontSize: '0.95rem',
            }}
          ></textarea>

          {/* Stats section */}
          <div className="d-flex justify-content-around text-center flex-wrap">
            <div className="stat-box px-4 py-2 rounded-pill shadow-sm bg-white mb-2">
              <h6 className="fw-bold text-primary mb-0">{wordCount}</h6>
              <small className="text-muted">Words</small>
            </div>
            <div className="stat-box px-4 py-2 rounded-pill shadow-sm bg-white mb-2">
              <h6 className="fw-bold text-success mb-0">{charCount}</h6>
              <small className="text-muted">Characters</small>
            </div>
            <div className="stat-box px-4 py-2 rounded-pill shadow-sm bg-white mb-2">
              <h6 className="fw-bold text-warning mb-0">{sentenceCount}</h6>
              <small className="text-muted">Sentences</small>
            </div>
          </div>

          <div className="text-center mt-3">
            <button
              className="btn btn-outline-danger px-4 rounded-pill"
              onClick={() => setText('')}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
