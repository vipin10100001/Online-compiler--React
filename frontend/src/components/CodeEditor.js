import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const CodeEditor = ({ isDarkMode }) => {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  const handleRunCode = async () => {
    try {
      const response = await axios.post("http://localhost:5010/execute", {
        code,
        language,
      });
      setOutput(response.data.output || "No output");
    } catch (err) {
      setOutput("Error: Unable to execute the code");
    }
  };

  return (
    <>
      <div className="editor-container">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>
        <Editor
          height="100%"
          width="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value)}
          theme={isDarkMode ? "vs-dark" : "light"}
        />
        <button onClick={handleRunCode}>Run Code</button>
      </div>
      <div className="output-container">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </>
  );
};

export default CodeEditor;
