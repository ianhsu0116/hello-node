const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

// middleware
router.use((req, res, next) => {
  console.log("member router!");
  next();
});

// 依 members.id 拿到到特定 member資料
router.get("/:memberId", async (req, res) => {
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

module.exports = router;
