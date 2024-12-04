const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = 5001; // Change the port number


// Route for executing code
app.post("/execute", (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code or language not provided" });
  }

  let fileName;
  let command;

  // Create file and set execution command based on language
  switch (language) {
    case "javascript":
      fileName = "code.js";
      fs.writeFileSync(fileName, code);
      command = `node ${fileName}`;
      break;

    case "python":
      fileName = "code.py";
      fs.writeFileSync(fileName, code);
      command = `python3 ${fileName}`;
      break;

    case "cpp":
      fileName = "code.cpp";
      fs.writeFileSync(fileName, code);
      command = `g++ ${fileName} -o code && ./code`;
      break;

    default:
      return res.status(400).json({ error: "Unsupported language" });
  }

  // Execute the command
  exec(command, (error, stdout, stderr) => {
    // Clean up the file after execution
    fs.unlinkSync(fileName);
    if (language === "cpp" && fs.existsSync("./code")) {
      fs.unlinkSync("./code");
    }

    if (error) {
      return res.json({ output: stderr || error.message });
    }

    res.json({ output: stdout || "No output" });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
