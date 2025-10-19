import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Screens/Dashboard.js';
import WordCounter from './Screens/WordCounter.js';
import ReferenceGenerator from './Screens/ReferenceGenerator.js';
import Paraphraser from './Screens/Paraphraser.js';
import Summarizer from './Screens/Summarizer.js';
import GrammarChecker from './Screens/GrammerChecker.js';
import PDFReader from './Screens/PDFReader.js';
import PDFMaker from './Screens/PDFMaker.js';
import 'pdfjs-dist/web/pdf_viewer.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/word-counter" element={<WordCounter />} />
        <Route path="/paraphraser" element={<Paraphraser />} />
        <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/grammar-checker" element={<GrammarChecker />} />
        <Route path="/reference-generator" element={<ReferenceGenerator />} />
        {/* PDF*/}
        <Route path="/pdf-maker" element={<PDFMaker />} />
        <Route path="/pdf-reader" element={<PDFReader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;