const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5010;

// Serve React frontend build (for deployment)
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Serve React index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Route for executing code
app.post("/run", (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code or language not provided" });
  }

  let fileName;
  let command;

  switch (language.toLowerCase()) {
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

  exec(command, (error, stdout, stderr) => {
    // Clean up the source code file
    if (fs.existsSync(fileName)) {
      fs.unlinkSync(fileName);
    }

    // For C++, also remove compiled binary
    if (language.toLowerCase() === "cpp" && fs.existsSync("./code")) {
      fs.unlinkSync("./code");
    }

    if (error) {
      return res.json({ output: stderr || error.message });
    }

    res.json({ output: stdout || "No output" });
  });
});

// Handle all other routes (React SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
