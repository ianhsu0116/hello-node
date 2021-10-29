const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(3502, () => {
  console.log("running on port 3502");
});
