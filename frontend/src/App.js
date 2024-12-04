import React, { useState } from 'react';
import './App.css';

const defaultCode = {
  JavaScript: `console.log("Hello, World!");`,
  Python: `print("Hello, World!")`,
  Cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}`,
  Java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`,
  Ruby: `puts "Hello, World!"`,
  Go: `package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello, World!")\n}`,
};

function App() {
  const [language, setLanguage] = useState('JavaScript');
  const [code, setCode] = useState(defaultCode[language]);
  const [output, setOutput] = useState('');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setCode(defaultCode[event.target.value]);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const runCode = async () => {
    try {
      // Send the code to your backend for execution (use the backend URL)
      const response = await fetch(`http://localhost:5010/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          code,
        }),
      });

      const result = await response.json();
      setOutput(result.output || 'Error executing code');
    } catch (error) {
      setOutput('Error executing code');
    }
  };

  return (
    <div className="App">
      <h1>Online Compiler</h1>
      <div className="compiler-container">
        <div className="input-section">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="language-select"
          >
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Cpp">C++</option>
            <option value="Java">Java</option>
            <option value="Ruby">Ruby</option>
            <option value="Go">Go</option>
          </select>

          <textarea
            className="code-editor"
            value={code}
            onChange={handleCodeChange}
            rows="10"
            cols="50"
          ></textarea>
        </div>

        <div className="output-section">
          <h3>Output:</h3>
          <div className="output-box">{output}</div>
        </div>
      </div>

      <button onClick={runCode} className="run-btn">Run Code</button>
    </div>
  );
}

export default App;
