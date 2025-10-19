import React, { useState } from 'react';
import Navbar from '../Helper/Nav';
import { FaFileAlt } from 'react-icons/fa';
import axios from 'axios';
import { URL_Summarize } from '../Helper/Url';
import { rejectedToast, successToast } from '../Helper/Alerts';

const Summarizer = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [maxLength, setMaxLength] = useState(100);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setSummary('');

    try {
      const response = await axios.post(URL_Summarize, {
        text,
        maxLength
      });
      if (response.data.status == true) {
        setSummary(response.data.summary);
      } else {
        rejectedToast("Error Summarizing Paragraph", response.data.message);
      }
    } catch (err) {
      rejectedToast("Error Summarizing Paragraph", "We Are Facing A Server Side Issue. Kindly Try Again Shortly.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary).then(() => {
      successToast('Copied!', 'Summary copied to clipboard successfully.');
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Text Summary',
        text: summary,
      }).catch((err) => rejectedToast('Share Failed', 'Unable to share on this device.'));
    } else {
      rejectedToast('Not Supported', 'Sharing is not supported on this device.');
    }
  };

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim() !== '').length;

  return (
    <div className="word-counter-bg min-vh-100">
      <Navbar />

      <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
        <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="text-center mb-3">
            <FaFileAlt size={32} className="text-primary mb-2" />
            <h4 className="fw-bold mb-0">Text Summarizer</h4>
            <p className="text-muted small mb-3">Type or paste your text below and get a quick summary instantly.</p>
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

          {/* Optional: Max Length Input */}
          <div className="mb-3 d-flex justify-content-center align-items-center gap-2">
            <label className="mb-0 text-muted small">Max summary words:</label>
            <input
              type="number"
              className="form-control"
              style={{ width: '80px' }}
              value={maxLength}
              min={20}
              onChange={(e) => setMaxLength(Number(e.target.value))}
            />
          </div>

          {/* Stats section */}
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

          <div className="text-center mb-3">
            <button
              className="btn btn-outline-success px-4 rounded-pill me-2"
              onClick={handleSummarize}
              disabled={loading}
            >
              {loading ? 'Summarizing...' : 'Summarize'}
            </button>
            <button
              className="btn btn-outline-danger px-4 rounded-pill"
              onClick={() => { setText(''); setSummary(''); }}
              disabled={loading}
            >
              Clear
            </button>
          </div>

          {/* Summary Output */}
          {summary && (
            <>
              <div className="bg-light p-3 rounded-3 shadow-sm">
                <h6 className="fw-bold text-secondary">Summary:</h6>
                <p className="mb-2">{summary}</p>
              </div>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={handleCopy}
                >
                  Copy
                </button>
                <button
                  className="btn btn-outline-primary rounded-pill px-4"
                  onClick={handleShare}
                >
                  Share
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
