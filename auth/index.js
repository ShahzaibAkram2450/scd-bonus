// auth basic Express app
const express = require("express");
const app = express();
app.use(express.json());

const users = [{ username: "admin", password: "password" }];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) return res.json({ token: "fake-jwt-token" });
  res.status(401).json({ error: "Invalid credentials" });
});

app.listen(3000, () => console.log("Auth API running on 3000"));
