// analytics basic Express app
const express = require("express");
const app = express();
app.use(express.json());

let hits = 0;

app.get("/hits", (req, res) => res.json({ hits }));
app.post("/track", (req, res) => {
  hits++;
  res.json({ hits });
});

app.listen(3000, () => console.log("Analytics API running on 3000"));
