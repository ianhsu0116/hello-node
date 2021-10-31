const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

// middleware
router.use((req, res, next) => {
  console.log("近入todos router!");
  next();
});

// 拿到所有 todos data
router.get("/", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  res.json(data);
});

// 拿到單筆todo detail
router.get("/:todoId", async (req, res) => {
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

module.exports = router;
