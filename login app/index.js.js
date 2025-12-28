const express = require("express");
const fs = require("fs");
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// redirect root ? login
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

// signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  let users = [];

  if (fs.existsSync("users.json")) {
    users = JSON.parse(fs.readFileSync("users.json"));
  }

  users.push({ username, password });
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  res.redirect("/login.html");
});

// login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync("users.json"));

  const ok = users.find(
    u => u.username === username && u.password === password
  );

  if (!ok) return res.send("Wrong login");

  res.send("LOGIN OK");
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));