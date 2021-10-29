const mysql = require("mysql");
const axios = require("axios");
const fs = require("fs/promises");
const moment = require("moment");
const Promise = require("bluebird");
require("dotenv").config();

let format = "json";
let date = moment().format("YYYYMMDD");

// connect to MySQL
let connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "mfee20_nodeJs",
  port: process.env.DB_PORT,
});

/// 利用bluebird 把 connection 的函式都變成 promise
connection = Promise.promisifyAll(connection);

// bluebird 保留原本的函式(不會覆蓋 此為原始的callback版)
//connection.connect();
// bluebird提供的新函式(Promise版  只要在原有函式後方加上Async即可)
connection.connectAsync();

// function insertPromise(insertData) {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       "INSERT IGNORE INTO stock (stock_no, date, deal, amount, count) VALUES (?, ?, ?, ?, ?)",
//       insertData,
//       function (err, results) {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(results);
//         }
//       }
//     );
//   });
// }

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
    //console.log(response.data);

    // 0 1 2 8
    let insertData = [
      stockNo,
      firstItem[0],
      firstItem[1],
      firstItem[2],
      firstItem[8],
    ];

    let result = await connection.queryAsync(
      "INSERT IGNORE INTO stock (stock_no, date, deal, amount, count) VALUES (?, ?, ?, ?, ?)",
      insertData
    );

    console.log(result);
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
}
