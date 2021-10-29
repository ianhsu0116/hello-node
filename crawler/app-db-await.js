const mysql = require("mysql");
const axios = require("axios");
const fs = require("fs/promises");
const moment = require("moment");
require("dotenv").config();
console.log(moment().format());
// connect to MySQL
let connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "mfee20_nodeJs",
  port: process.env.DB_PORT,
});
connection.connect();
let format = "json";
let date = "20211017";

function insertPromise(insertData) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT IGNORE INTO stock (stock_no, date, deal, amount, count) VALUES (?, ?, ?, ?, ?)",
      insertData,
      function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

// async await
getStockData(format, date);
async function getStockData(format, date) {
  try {
    let stockNo = await fs.readFile("stock.txt", "utf-8");

    let response = await axios.get(
      `https://www.twse.com.tw/exchangeReport/STOCK_DAY`,
      {
        params: {
          stockNo,
          response: format,
          date,
        },
      }
    );
    let firstItem = response.data.data[0];

    // 0 1 2 8
    let insertData = [
      stockNo,
      firstItem[0],
      firstItem[1],
      firstItem[2],
      firstItem[8],
    ];

    let result = await insertPromise(insertData);
    console.log(result);
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
}

// password: dotenv
