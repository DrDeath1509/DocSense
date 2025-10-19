import React, { useState } from "react";
import Navbar from "../Helper/Nav";
import { FaFilePdf } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import { rejectedToast, successToast } from "../Helper/Alerts";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const PdfReader = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      rejectedToast("Invalid File", "Please select a valid PDF file.");
      return;
    }

    setFile(selectedFile);
    setPageNumber(1);
    successToast("File Loaded", "PDF file loaded successfully.");
  };

  const handleZoomIn = () => setScale(scale + 0.2);
  const handleZoomOut = () => setScale(Math.max(scale - 0.2, 0.8));
  const handlePrev = () => setPageNumber(Math.max(pageNumber - 1, 1));
  const handleNext = () => setPageNumber(Math.min(pageNumber + 1, numPages));

  const handleDownload = () => {
    if (!file) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    link.click();
    successToast("Download Started", "Your PDF is downloading.");
  };

  return (
    <div className="word-counter-bg min-vh-100">
      <Navbar />
      <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
        <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: "600px", width: "100%" }}>
          <div className="text-center mb-3">
            <FaFilePdf size={32} className="text-danger mb-2" />
            <h4 className="fw-bold mb-0">PDF Reader</h4>
            <p className="text-muted small mb-3">Upload and view your PDF documents directly in your browser.</p>
          </div>

          <div className="text-center mb-3">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="form-control mb-3"
              style={{ cursor: "pointer" }}
            />
          </div>

          {file && (
            <>
              <div className="d-flex justify-content-center align-items-center gap-2 mb-3 flex-wrap">
                <button className="btn btn-outline-primary rounded-pill px-3" onClick={handlePrev}>
                  ⬅ Prev
                </button>
                <span className="text-muted small">
                  Page {pageNumber} of {numPages || "?"}
                </span>
                <button className="btn btn-outline-primary rounded-pill px-3" onClick={handleNext}>
                  Next ➡
                </button>
              </div>

              <div className="d-flex justify-content-center align-items-center gap-3 mb-3 flex-wrap">
                <button className="btn btn-outline-success rounded-pill px-3" onClick={handleZoomIn}>
                  🔍 Zoom In
                </button>
                <button className="btn btn-outline-warning rounded-pill px-3" onClick={handleZoomOut}>
                  🔎 Zoom Out
                </button>
                <button className="btn btn-outline-danger rounded-pill px-3" onClick={handleDownload}>
                  ⬇ Download
                </button>
              </div>

              <div
                className="bg-light p-3 rounded-3 shadow-sm text-center"
                style={{ overflowY: "auto", maxHeight: "70vh" }}
              >
                <Document
                  file={file}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  onLoadError={() => rejectedToast("Error", "Failed to load PDF file.")}
                >
                  <Page pageNumber={pageNumber} scale={scale} />
                </Document>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfReader;
