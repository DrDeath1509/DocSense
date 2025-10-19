import React, { useState } from "react";
import Navbar from "../Helper/Nav"; // optional — if you have a Navbar
import { FaSyncAlt } from "react-icons/fa";
import { rejectedToast } from "../Helper/Alerts";

const Paraphraser = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleParaphrase = () => {
    if (!inputText.trim()) {
      rejectedToast("Missing Fields", "Please enter text to paraphrase");
      return;
    }

    // Simulated paraphrase result
    setOutputText(
      inputText
        .split(" ")
        .reverse()
        .join(" ") + " (sample paraphrased output)"
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    rejectedToast("Copied", "Paraphrased text copied to clipboard!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Paraphrased Text",
        text: outputText,
      });
    } else {
      rejectedToast("Unavailable", "Sharing not supported on this device.");
    }
  };

  return (
    <div className="paraphraser-screen min-vh-100 bg-light">
      <Navbar />

      <div className="container d-flex flex-column align-items-center justify-content-center py-5">
        <div className="paraphraser-card card border-0 shadow-lg rounded-4 p-4 w-100" style={{ maxWidth: 500 }}>
          <div className="text-center mb-4">
            <FaSyncAlt size={28} className="text-primary mb-2" />
            <h5 className="fw-bold mb-1">Paraphraser</h5>
            <p className="text-muted small">Rephrase your text in a smarter way.</p>
          </div>

          {/* Input Text */}
          <div className="mb-3">
            <textarea
              className="form-control rounded-4 p-3"
              rows="5"
              placeholder="Enter text to paraphrase..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          {/* Paraphrase Button */}
          <button
            className="btn btn-primary w-100 rounded-pill fw-semibold py-2"
            onClick={handleParaphrase}
          >
            Paraphrase Text
          </button>

          {/* Copy & Share Buttons */}
          {outputText && (
            <>
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

              {/* Output Box */}
              <div className="output-box border rounded-4 bg-white p-3 mt-3 small">
                {outputText}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paraphraser;
