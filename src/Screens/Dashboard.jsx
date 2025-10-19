import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Helper/Nav';
import { FaPenNib, FaRedo, FaFileAlt, FaCheckCircle, FaBook, FaFilePdf, FaFileSignature } from 'react-icons/fa';
import '../App.css'; // for the gradient background and hover effect

const Dashboard = () => {
  const navigate = useNavigate();

  const tools = [
    {
      name: 'Word Counter',
      icon: <FaFileAlt size={40} className="text-primary" />,
      description: 'Count words, characters, and sentences instantly for any text you enter.',
      path: '/word-counter'
    },
    // {
    //   name: 'Paraphraser',
    //   icon: <FaRedo size={40} className="text-success" />,
    //   description: 'Rephrase your text with clarity and originality while maintaining meaning.',
    //   path: '/paraphraser'
    // },
    {
      name: 'Summarizer',
      icon: <FaPenNib size={40} className="text-warning" />,
      description: 'Generate concise summaries from large paragraphs or articles in seconds.',
      path: '/summarizer'
    },
    {
      name: 'Grammar Checker',
      icon: <FaCheckCircle size={40} className="text-danger" />,
      description: 'Detect and fix grammar, spelling, and punctuation errors automatically.',
      path: '/grammar-checker'
    },
    {
      name: 'Reference Generator',
      icon: <FaBook size={40} className="text-info" />,
      description: 'Create accurate citations and references for your research papers easily.',
      path: '/reference-generator'
    },
    {
      name: 'PDF Reader',
      icon: <FaFilePdf size={40} className="text-danger" />,
      description: 'Upload, view, and download PDF documents directly in your browser with easy navigation and zoom controls.',
      path: '/pdf-reader'
    },
    {
      name: 'PDF Maker',
      icon: <FaFileSignature size={40} className="text-success" />,
      description: 'Write, format, and download custom PDF documents easily.',
      path: '/pdf-maker'
    },
  ];

  return (
    <div className="word-counter-bg min-vh-100">
      <Navbar />
      <div className="container py-5">
        {/* Heading Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-dark">Your Writing Toolkit</h1>
          <p className="text-muted mb-0">
            Choose from a variety of tools to enhance your writing, productivity, and creativity.
          </p>
        </div>

        {/* Tool Cards */}
        <div className="row g-4">
          {tools.map((tool, index) => (
            <div className="col-md-4 col-sm-6" key={index}>
              <div
                className="card h-100 border-0 rounded-4 text-center p-4"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                  background: '#ffffffcc',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)')
                }
              >
                <div className="mb-3">{tool.icon}</div>
                <h5 className="fw-bold">{tool.name}</h5>
                <p className="text-muted small">{tool.description}</p>
                <button
                  className="btn btn-outline-primary mt-2 px-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(tool.path);
                  }}
                >
                  Open Tool
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
