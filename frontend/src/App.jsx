import '/Users/Dwijesh/Documents/Nyx/frontend/src/App.css';
import React, { useState } from "react";
import axios from "axios";
import logo from "/Users/Dwijesh/Documents/Nyx/frontend/src/assets/Nyxlogo.png";


export default function App() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [summaryType, setSummaryType] = useState("paragraph");
  const [summaryLength, setSummaryLength] = useState(50);
  const [selectedTool, setSelectedTool] = useState("summarize"); // default tool

  

const handleSubmit = async () => {
  if (!text && !url && !file) return alert("Please add text, URL, or file");

  setLoading(true);
  setSummary("");

  try {
    const formData = new FormData();
    if (text) formData.append("text", text);
    if (url) formData.append("url", url);
    if (file) formData.append("file", file);

    // Add these fields so backend knows which tool and settings to use
    formData.append("tool", selectedTool);
    formData.append("summaryType", summaryType);
    formData.append("summaryLength", summaryLength);

    const res = await axios.post("http://localhost:5000/api/summarize", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setSummary(res.data.summary);
  } catch (err) {
    alert("Error processing your request");
    console.error(err);
  }

  setLoading(false);
};


  const downloadSummary = () => {
    if (!summary) return;
    const blob = new Blob([summary], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "summary.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <header>
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <img
  src={logo}
  alt="Nyx Logo"
  className="h-10 max h-12 max w-[120px] object-contain"
/>
      <h1 className="text-2xl font-bold"></h1>
    </div>
    <nav className="space-x-6 flex">
      <button className="hover:text-blue-600">Tools</button>
      <button className="hover:text-blue-600">About Us</button>
      <button className="hover:text-blue-600">Chat (coming soon)</button>
      <button className="hover:text-blue-600">Pricing</button>
      <button className="hover:text-blue-600">Account</button>
    </nav>
  </div>
</header>



      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Nyx</h2>
          <p className="text-lg md:text-xl mb-6">
            One AI Platform for everything. Paste text, upload documents, or add a URL. Summarize, humanize, extract keywords, or check plagiarism in seconds.
          </p>
          <button
            onClick={() => document.getElementById("inputSection").scrollIntoView({ behavior: "smooth" })}
            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Try Now
          </button>
        </div>
      </section>

      {/* Tool Selection Section */}
<section className="tool-selection max-w-4xl mx-auto px-6 mt-8 text-center">
  <h2 className="text-2xl font-bold mb-4">Choose an AI Tool</h2>
  <p className="text-gray-600 mb-6">Select what you want to do with your text</p>

<div className="flex flex-row flex-wrap justify-center gap-4">
  <div
    className={`tool-card ${selectedTool === "summarize" ? "active" : ""}`}
    onClick={() => setSelectedTool("summarize")}
  >
    <div>📝</div>
    <div className="font-semibold">Summarize</div>
  </div>

  <div
    className={`tool-card ${selectedTool === "humanize" ? "active" : ""}`}
    onClick={() => setSelectedTool("humanize")}
  >
    <div>✍️</div>
    <div className="font-semibold">Humanize</div>
  </div>

  <div
    className={`tool-card ${selectedTool === "plagiarism" ? "active" : ""}`}
    onClick={() => setSelectedTool("plagiarism")}
  >
    <div>🔍</div>
    <div className="font-semibold">Plagiarism</div>
  </div>

  <div
    className={`tool-card ${selectedTool === "keywords" ? "active" : ""}`}
    onClick={() => setSelectedTool("keywords")}
  >
    <div>🗝️</div>
    <div className="font-semibold">Keywords</div>
  </div>
</div>

</section>


      {/* Input Section */}
      <section id="inputSection" className="input-section">
        <h2 className="text-3xl font-bold mb-4 text-center">Nyx , the source, the space, the everything</h2>
        <p className="text-gray-600 text-center mb-6">
          Paste text, upload a document, or add a URL. Get whatever you need instantly with our AI tools.
        </p>

        <textarea
          className="w-full h-36 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
          placeholder="Enter or paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="url"
          placeholder="Add URL here..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          type="file"
          accept=".txt,.docx,.pdf"
          className="w-full mb-4"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Summary Options */}
        {selectedTool === "summarize" && (
  <div className="flex flex-col sm:flex-row gap-4 mb-4">
    <select value={summaryType} onChange={(e) => setSummaryType(e.target.value)} className="p-2 border border-gray-300 rounded">
      <option value="paragraph">Paragraph</option>
      <option value="bullets">Bullets</option>
      <option value="bestline">Best Line</option>
    </select>

    <div className="flex items-center gap-2">
      <label>Summary Length:</label>
      <input
        type="range"
        min="10"
        max="100"
        value={summaryLength}
        onChange={(e) => setSummaryLength(e.target.value)}
      />
      <span>{summaryLength}%</span>
    </div>
  </div>
)}

        <div className="flex flex-col sm:flex-row sm:justify-between mt-4 gap-2">
          <button
  onClick={handleSubmit}
  disabled={loading}
  className="btn-primary"
>
  {loading
    ? `${selectedTool[0].toUpperCase() + selectedTool.slice(1)}...`
    : `${selectedTool[0].toUpperCase() + selectedTool.slice(1)}`}
</button>
          <button
            onClick={() => {
              setText(""); setUrl(""); setFile(null); setSummary("");
            }}
            className="btn-secondary"
          >
            Clear
          </button>
          {summary && (
            <button
              onClick={downloadSummary}
              className="btn-success"
            >
              Download Result
            </button>
          )}
        </div>

        {summary && (
          <div className="summary-card">
            <h3 className="font-semibold mb-2">Summary</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto mt-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Nyx?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="feature-card">
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="font-semibold mb-2">Advanced AI</h3>
            <p className="text-gray-600 text-sm">
              Works across summaries, rewrites, keyword extraction, and plagiarism checks using powerful language models.
            </p>
          </div>
          <div className="feature-card">
            <div className="text-4xl mb-2">🌐</div>
            <h3 className="font-semibold mb-2">Multiple Languages</h3>
            <p className="text-gray-600 text-sm">
              Process text in 11+ languages — summarize, humanize, and analyze content in your preferred language.
            </p>
          </div>
          <div className="feature-card">
            <div className="text-4xl mb-2">📄</div>
            <h3 className="font-semibold mb-2">Custom Summaries</h3>
            <p className="text-gray-600 text-sm">
              Choose paragraph or bullet formats, adjust length, and tailor results for every task.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white mt-12 py-12 text-center rounded-xl mx-6">
        <h2 className="text-3xl font-bold mb-4">Ready to Work Smarter with Nyx?</h2>
        <p className="mb-6">Start using Nyx now and boost your productivity with AI.</p>
        <button
          onClick={() => document.getElementById("inputSection").scrollIntoView({ behavior: "smooth" })}
          className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Try Nyx Now
        </button>
      </section>

      {/* Footer */}
      <footer className="mt-12 bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-lg">Nyx Ai</div>
          <div className="flex space-x-4 text-gray-300 text-sm">
            <span>Privacy Policy & Terms and Conditions</span>
          </div>
          <div className="text-gray-400 text-sm">Contact</div>
          <div className="text-gray-400 text-sm">© 2026 Nyx Ai. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

