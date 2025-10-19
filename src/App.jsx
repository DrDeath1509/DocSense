import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Screens/Dashboard';
import WordCounter from './Screens/WordCounter';
import ReferenceGenerator from './Screens/ReferenceGenerator';
import Paraphraser from './Screens/Paraphraser';
import Summarizer from './Screens/Summarizer';
import GrammarChecker from './Screens/GrammerChecker';
import PDFReader from './Screens/PdfReader';
import PDFMaker from './Screens/PDFMaker';
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