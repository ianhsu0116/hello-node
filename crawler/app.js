const axios = require("axios");

let stockNo = "0050";
let format = "json";
let date = "20211017";

//https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=${format}&date=${format}&stockNo=${stockCode}&_=1634437384538

// promise
// axios
//   .get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
//     params: {
//       stockNo,
//       response: format,
//       date,
//     },
//   })
//   .then(function (response) {
//     // handle success
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   });

// async await
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
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}
getStockData(stockNo, format, date);

/// 測試merge
