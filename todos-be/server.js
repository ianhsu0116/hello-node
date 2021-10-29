const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Hit this middleware!!!");
  next();
});

app.get("/", (req, res) => {
  res.send("Homepage");
});
app.get("/cart", (req, res) => {
  res.send("cart page");
});
app.get("/about", (req, res) => {
  res.send("about me page");
});

app.use((req, res, next) => {
  res.send("404 page not found!!!");
});

app.listen(3502, () => {
  console.log("running on port 3502");
});
