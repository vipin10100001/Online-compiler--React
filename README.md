
# Online Compiler - React

An elegant and full-screen **Online Code Compiler** built using **React.js**, with support for **JavaScript**, **Python**, and **C++**.  
Easily switch between **Light Mode** and **Dark Mode**, write code, and run it instantly — all in a sleek, professional interface.

---

## 🚀 Features

- ✏️ Code editor supporting JavaScript, Python, and C++.
- 🛠️ Run your code with a single click.
- 🌗 Light Mode and Dark Mode toggle with preference saved locally.
- 🎨 Responsive, full-screen, clean and professional design.
- ⚡ Fast output display with error handling.

---

## 🧩 Tech Stack

- **Frontend**: React.js
- **Styling**: Pure CSS
- **Backend**: Node.js (Expected API at `http://localhost:5010/run`)

---

## 🗂️ Project Structure
/src ├── App.js # Main application component ├── App.css # Styling for the app /public ├── index.html # Base HTML template

yaml
Copy
Edit

---

## ⚙️ How to Run Locally

### 1. Clone the Repository
bash
git clone https://github.com/your-username/online-compiler.git
cd online-compiler
### 2. Install Dependencies

bash
Copy
Edit
npm install
3. ### Start the React App
bash
Copy
Edit
npm start
This will open the app on http://localhost:3000.

### 🛠 Backend API Setup
The frontend expects a backend server at http://localhost:5010/run.
You can create a minimal backend server using Node.js and Express.

Create a server.js
javascript
Copy
Edit
const express = require('express');
const cors = require('cors');
const app = express();
const { exec } = require('child_process');

app.use(cors());
app.use(express.json());

app.post('/run', (req, res) => {
  const { language, code } = req.body;

  let command;

  if (language === 'JavaScript') {
    command = `node -e "${code.replace(/"/g, '\\"')}"`;
  } else if (language === 'Python') {
    command = `python -c "${code.replace(/"/g, '\\"')}"`;
  } else if (language === 'Cpp') {
    res.json({ output: "C++ execution not fully supported in this demo server." });
    return;
  } else {
    res.json({ output: "Unsupported language" });
    return;
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.json({ output: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
});

app.listen(5010, () => console.log('Server running on http://localhost:5010'));
Install backend dependencies
bash
Copy
Edit
npm install express cors
Start backend server
bash
Copy
Edit
node server.js
⚠️ Note: This is a very basic backend. Running user-provided code directly is unsafe. Use it only for local testing.

### 📡 Backend API Specification
POST http://localhost:5010/run

Request Body:

json
Copy
Edit
{
  "language": "JavaScript" | "Python" | "Cpp",
  "code": "your code here"
}
Response:

json
Copy
Edit
{
  "output": "Execution result here"
}

### 📌 Future Improvements
Secure backend execution (sandbox environment).

Add more language support (Java, C#, Go).

Code editor enhancements (syntax highlighting, line numbers).

Save and download code snippets.

User authentication and history of executed codes.

### 📜 License
This project is open-sourced under the MIT License.

### ✨ Connect
Made with ❤️ using React.js

### 🔥 Happy Coding!

---

