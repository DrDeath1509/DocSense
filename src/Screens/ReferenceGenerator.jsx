import React, { useState } from 'react';
import Navbar from '../Helper/Nav';
import { FaLightbulb } from 'react-icons/fa';
import { rejectedToast } from '../Helper/Alerts';

const ReferenceGenerator = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [journal, setJournal] = useState('');
  const [customJournal, setCustomJournal] = useState('');
  const [doi, setDoi] = useState('');
  const [citation, setCitation] = useState('');

  const journals = [
    'Nature',
    'Science',
    'IEEE Access',
    'Environmental Science Journal',
    'Journal of Applied Physics',
    'Computer Science Review',
    'Renewable Energy Letters',
    'ACM Computing Surveys',
    'Medical Research Archives',
    'AI & Machine Learning Journal',
    'Oxford Academic Journal',
    'The Lancet',
    'Springer Open',
    'MIT Technology Review',
    'Harvard Business Review',
    'Other (Specify...)' // Added custom option
  ];

  const generateCitation = () => {
    if (!author) {
      rejectedToast('Missing Fields', 'Please enter author name(s)');
      return;
    }
    if (!title) {
      rejectedToast('Missing Fields', 'Please enter the title');
      return;
    }
    if (!year) {
      rejectedToast('Missing Fields', 'Please enter publication year');
      return;
    }
    if (!journal) {
      rejectedToast('Missing Fields', 'Please select a journal or website');
      return;
    }

    // use custom journal if "Other" selected
    const finalJournal = journal === 'Other (Specify...)' ? customJournal.trim() : journal;
    if (journal === 'Other (Specify...)' && !finalJournal) {
      rejectedToast('Missing Fields', 'Please enter your custom journal or website');
      return;
    }

    const formattedCitation = `${author} (${year}). ${title}. *${finalJournal}*. ${doi ? `doi:${doi}` : ''}`;
    setCitation(formattedCitation);
  };

  const copyCitation = () => {
    navigator.clipboard.writeText(citation);
    rejectedToast('Copied', 'Citation copied to clipboard!');
  };

  return (
    <div className="reference-generator min-vh-100">
      <Navbar />

      <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
        <div className="ref-card card border-0 rounded-4 p-4 shadow-lg">
          <div className="text-center mb-4">
            <FaLightbulb size={32} className="text-primary mb-2" />
            <h4 className="fw-bold mb-0">Reference Generator</h4>
            <p className="text-muted small">Quickly create accurate academic citations in seconds.</p>
          </div>

          {/* Author Input */}
          <div className="ref-input mb-3">
            <label className="fw-semibold small">Author(s)</label>
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="Jane Doe, John Smith"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          {/* Title Input */}
          <div className="ref-input mb-3">
            <label className="fw-semibold small">Title</label>
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="The Future of Renewable Energy"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Year Input */}
          <div className="ref-input mb-3">
            <label className="fw-semibold small">Publication Year</label>
            <input
              type="number"
              className="form-control rounded-3"
              placeholder="2023"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          {/* Journal Dropdown */}
          <div className="ref-input mb-3">
            <label className="fw-semibold small">Journal/Website</label>
            <select
              className="form-select rounded-3"
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
            >
              <option value="">Select Journal or Website</option>
              {journals.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Journal Input (if Other selected) */}
          {journal === 'Other (Specify...)' && (
            <div className="ref-input mb-3">
              <label className="fw-semibold small">Enter Custom Journal/Website</label>
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="Enter journal or website name"
                value={customJournal}
                onChange={(e) => setCustomJournal(e.target.value)}
              />
            </div>
          )}

          {/* DOI Input (Optional) */}
          <div className="ref-input mb-4">
            <label className="fw-semibold small">DOI/URL (Optional)</label>
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="10.1234/envsci/2023.01"
              value={doi}
              onChange={(e) => setDoi(e.target.value)}
            />
          </div>

          <button
            className="ref-btn btn btn-primary w-100 rounded-pill fw-semibold"
            onClick={generateCitation}
          >
            Generate Citation
          </button>

          {citation && (
            <div className="ref-output mt-4 text-center small">
              <p className="mb-2">{citation}</p>
              <div className="d-flex justify-content-center gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                  onClick={copyCitation}
                >
                  Copy
                </button>
                <button
                  className="btn btn-outline-primary btn-sm rounded-pill px-3"
                  onClick={() =>
                    window.open(`mailto:?subject=Citation&body=${citation}`)
                  }
                >
                  Share
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferenceGenerator;
