// blog-api basic Express app
const express = require("express");
const app = express();
app.use(express.json());

let posts = [];

app.get("/posts", (req, res) => res.json(posts));
app.post("/posts", (req, res) => {
  posts.push(req.body);
  res.status(201).json(req.body);
});

app.listen(3000, () => console.log("Blog API running on 3000"));
