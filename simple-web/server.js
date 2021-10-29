const http = require("http");
const fs = require("fs/promises");

const serevr = http.createServer(async (req, res) => {
  let path = req.url;
  res.setHeader("Content-Type", "text/html;charset=utf-8");
  switch (path) {
    case "/":
      let result = await fs.readFile("homepage.html", "utf-8");
      res.end(result);
      break;
    case "/member":
      res.end("會員頁");
      break;
    default:
      res.statusCode = 404;
      res.end("404 not found");
  }
});

serevr.listen("3501", () => {
  console.log("server is running on port 3501");
});
