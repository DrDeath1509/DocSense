import React, { useState } from 'react';
import Navbar from '../Helper/Nav';
import { FaFileAlt } from 'react-icons/fa';
import axios from 'axios';
import { rejectedToast, successToast } from '../Helper/Alerts';
import { URL_Grammar } from '../Helper/Url';

const GrammarChecker = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckGrammar = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(URL_Grammar, { text });
      if (response.data.status === true) {
        // Replace <error> tags with class-based spans
        const highlightedHTML = response.data.highlightedText
          .replaceAll('<error type="spelling">', '<span class="grammar-spelling-err">')
          .replaceAll('<error type="grammar">', '<span class="grammar-grammar-err">')
          .replaceAll('</error>', '</span>');

        setResult({ ...response.data, highlightedHTML });
      } else {
        rejectedToast('Grammar Check Failed', response.data.message);
      }
    } catch {
      rejectedToast('Grammar Check Failed', 'Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      successToast('Copied!', 'Text copied to clipboard.');
    });
  };

  const handleShare = (content) => {
    if (navigator.share) {
      navigator
        .share({ title: 'Grammar Check Result', text: content })
        .catch(() => rejectedToast('Share Failed', 'Unable to share on this device.'));
    } else {
      rejectedToast('Not Supported', 'Sharing is not supported on this device.');
    }
  };

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const sentenceCount = text.split(/[.!?]+/).filter((s) => s.trim() !== '').length;

  return (
    <div className="word-counter-bg min-vh-100">
      <Navbar />

      <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
        <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '700px', width: '100%' }}>
          <div className="text-center mb-3">
            <FaFileAlt size={32} className="text-primary mb-2" />
            <h4 className="fw-bold mb-0">Grammar Checker</h4>
            <p className="text-muted small mb-3">
              Type or paste your text below to check grammar and spelling instantly.
            </p>
          </div>

          {/* Textarea */}
          <textarea
            className="form-control rounded-3 mb-3"
            rows="7"
            placeholder="Start typing your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ resize: 'none', borderColor: '#dee2e6', boxShadow: 'none', fontSize: '0.95rem' }}
          ></textarea>

          {/* Stats */}
          <div className="d-flex justify-content-around text-center flex-wrap mb-3">
            <div className="stat-box px-4 py-2 rounded-pill shadow-sm bg-white mb-2">
              <h6 className="fw-bold text-primary mb-0">{wordCount}</h6>
              <small className="text-muted">Words</small>
            </div>
            <div className="stat-box px-4 py-2 rounded-pill shadow-sm bg-white mb-2">
              <h6 className="fw-bold text-warning mb-0">{sentenceCount}</h6>
              <small className="text-muted">Sentences</small>
            </div>
          </div>

          {/* Buttons */}
          <div className="text-center mb-3">
            <button
              className="btn btn-outline-success px-4 rounded-pill me-2"
              onClick={handleCheckGrammar}
              disabled={loading}
            >
              {loading ? 'Checking...' : 'Check Grammar'}
            </button>
            <button
              className="btn btn-outline-danger px-4 rounded-pill"
              onClick={() => setText('') || setResult(null)}
              disabled={loading}
            >
              Clear
            </button>
          </div>

          {/* Results */}
          {result && (
            <>
              {/* Corrected Text */}
              <div className="bg-light p-3 rounded-3 shadow-sm mb-3">
                <h6 className="fw-bold text-secondary">Corrected Text:</h6>
                <p className="mb-2">{result.correctedText}</p>
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleCopy(result.correctedText)}>
                    Copy
                  </button>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => handleShare(result.correctedText)}>
                    Share
                  </button>
                </div>
              </div>

              {/* Highlighted Errors */}
              <div className="bg-light p-3 rounded-3 shadow-sm mb-3">
                <h6 className="fw-bold text-secondary">Highlighted Errors:</h6>
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{ __html: result.highlightedHTML }}
                  style={{ whiteSpace: 'pre-wrap' }}
                ></div>
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleCopy(result.highlightedText)}>
                    Copy
                  </button>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => handleShare(result.highlightedText)}>
                    Share
                  </button>
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-light p-3 rounded-3 shadow-sm">
                <h6 className="fw-bold text-secondary">Suggestions:</h6>
                {result.suggestions.length === 0 ? (
                  <p className="mb-0">No issues found.</p>
                ) : (
                  <ul className="mb-0">
                    {result.suggestions.map((s, idx) => (
                      <li key={idx}>
                        {s.type === 'spelling' ? (
                          <span>
                            <b>Spelling:</b> <span className="text-danger">{s.word}</span> →{' '}
                            {s.corrections.join(', ')}
                          </span>
                        ) : (
                          <span>
                            <b>Grammar:</b> <span className="text-danger">{s.error}</span> → <i>{s.sentence}</i>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrammarChecker;
