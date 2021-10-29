const mysql = require("mysql");
const axios = require("axios");
require("dotenv").config();

let connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "mfee20_nodeJs",
  port: process.env.DB_PORT,
});
connection.connect();

let stockNo = "0050";
let format = "json";
let date = "20211017";

// async await
getStockData(stockNo, format, date);
async function getStockData(stockNo, format, date) {
  try {
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

    connection.query(
      "INSERT IGNORE INTO stock (stock_no, date, deal, amount, count) VALUES (?, ?, ?, ?, ?)",
      [stockNo, firstItem[0], firstItem[1], firstItem[2], firstItem[8]],
      function (error, results) {
        if (error) {
          console.log(error);
        } else {
          console.log(results);
        }
      }
    );
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
}
