import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const CodeEditor = ({ isDarkMode }) => {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRunCode = async () => {
    setLoading(true);
    setOutput("");

    try {
      const response = await axios.post("http://localhost:5001/execute", {
        code,
        language,
      });
      setOutput(response.data.output || "No output");
    } catch (err) {
      setOutput(
        `Error: ${err.response?.data?.error || "Unable to execute the code"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="code-editor-container">
      <header className="header">
        <h1>Online Compiler</h1>
      </header>
      <div className="editor-section">
        <div className="editor-controls">
          <label htmlFor="language-select" className="language-label">
            Select Language:
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
          <button
            onClick={handleRunCode}
            className="run-btn"
            disabled={loading}
          >
            {loading ? "Running..." : "Run Code"}
          </button>
        </div>
        <div className="editor-wrapper">
          <Editor
            height="300px"
            width="100%"
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme={isDarkMode ? "vs-dark" : "light"}
          />
        </div>
      </div>
      <div className="output-section">
        <h3>Output:</h3>
        <pre className="output-box">
          {output || "Output will appear here..."}
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;
