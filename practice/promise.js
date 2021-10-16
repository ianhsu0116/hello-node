const fs = require("fs");

function readData() {
  return new Promise((resolve, reject) => {
    fs.readFile("input.txt", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

let p = readData();
p.then((data) => {
  console.log("success", data);
}).catch((err) => {
  console.log("failed", err);
});
