import React, { useState, useEffect } from "react";
import "./App.css";

const defaultCode = {
  JavaScript: `console.log("Hello, World!");`,
  Python: `print("Hello, World!")`,
  Cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}`,
};

function App() {
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState(defaultCode[language]);
  const [output, setOutput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    setCode(defaultCode[selectedLanguage] || "");
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const runCode = async () => {
    try {
      const response = await fetch(`http://localhost:5010/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language, code }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      setOutput(result.output || "No output");
    } catch (error) {
      setOutput(`Error executing code: ${error.message}`);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header className="header">
        <h1 className="app-title">Online Code Compiler</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <main className="compiler-container">
        <div className="input-section">
          <label htmlFor="language-select" className="section-label">Select Language:</label>
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            className="language-select"
          >
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Cpp">C++</option>
          </select>

          <textarea
            value={code}
            onChange={handleCodeChange}
            className="code-input"
          />

          <button onClick={runCode} className="run-code-btn">
            ▶ Run Code
          </button>
        </div>

        <div className="output-section">
          <h2 className="section-label">Output:</h2>
          <div className="output-box">{output || "Run the code to see the output here."}</div>
        </div>
      </main>
    </div>
  );
}

export default App;
