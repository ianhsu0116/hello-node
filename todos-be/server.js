const express = require("express");
const app = express();
const moment = require("moment");
const cors = require("cors");
const mysql = require("mysql");
const Promise = require("bluebird");
require("dotenv").config();

// connect to DB
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
connection = Promise.promisifyAll(connection);

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`有人來訪歐歐歐 ${moment().format()}`);
  next();
});

// 認證相關路由
const authRoute = require("./routers/auth");
app.use("/api/auth", authRoute);

// todos data相關路由
const todosRoute = require("./routers/todos");
app.use("/api/todos", todosRoute);

// member data 相關路由
const memberRoute = require("./routers/member");
app.use("/api/member", memberRoute);

// 首頁
app.get("/", (req, res) => {
  res.send("Homepage");
});

// errorHandler
app.use((req, res, next) => {
  res.status(404).send("404 page not found!!!");
});

// port
app.listen(3502, () => {
  console.log("running on port 3502");
});
