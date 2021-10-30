const express = require("express");
const app = express();
const mysql = require("mysql");
const moment = require("moment");
const cors = require("cors");
const Promise = require("bluebird");
require("dotenv").config();

// connect ro DB
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection = Promise.promisifyAll(connection);

// middleware
app.use((req, res, next) => {
  console.log(`有人來訪歐歐歐 ${moment().format("YYYYMMDD")}`);
  next();
});
app.use(cors());

app.get("/", (req, res) => {
  res.send("Homepage");
});

// 依 members.id 拿到到特定 member資料
app.get("/api/member/:memberId", async (req, res) => {
  let { memberId } = req.params;
  let data = await connection.queryAsync(
    "SELECT * FROM members WHERE members.id = ?",
    [memberId]
  );

  if (data.length > 0) {
    // 有找到data => 回復第一項(MySQL都會回覆一個Array)
    res.json(data[0]);
  } else {
    // 沒找到資料的話
    res.status(404).send("Not found");
  }
});

// 拿到所有 todos data
app.get("/api/todos", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  res.json(data);
});

// 拿到單筆todo detail
app.get("/api/todos/:todoId", async (req, res) => {
  let { todoId } = req.params;
  console.log(req.query);
  let data = await connection.queryAsync(
    `SELECT todos.*, members.* FROM todos, members WHERE todos.creator_id = members.id AND todos.id = ?;`,
    [todoId]
  );

  if (data.length > 0) {
    // 有找到data => 回復第一項(MySQL都會回覆一個Array)
    res.json(data[0]);
  } else {
    // 沒找到資料的話
    res.status(404).send("Not found");
  }
});

// errorHandler
app.use((req, res, next) => {
  res.send("404 page not found!!!");
});

// port
app.listen(3502, () => {
  connection.connect();
  console.log("running on port 3502");
});
