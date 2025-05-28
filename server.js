console.log("Server started on port 3000");
const express = require('express');
const app = express();
app.use(express.json());
console.log("Server starting...");
console.log("API Key loaded:", process.env.OPENAI_API_KEY ? "YES" : "NO");
app.post('/api/openai', async (req, res) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify(req.body)
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000);