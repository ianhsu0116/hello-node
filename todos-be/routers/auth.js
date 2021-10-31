const express = require("express");
const router = express.Router();
const moment = require("moment");
const connection = require("../utils/db");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// 認證
const registerRules = [
  body("email").isEmail().withMessage("Email欄位請正確填寫"),
  body("password").isLength({ min: 6 }).withMessage("password長度至少為6"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("密碼與確認密碼不一致"),
];
// middleware
router.use((req, res, next) => {
  console.log("auth router!");
  next();
});

// local註冊
router.post("/register", registerRules, async (req, res) => {
  let { email, password, confirmPassword, name, photo } = req.body;

  const validateResult = validationResult(req);

  // 確認前端送來的data有無問題
  if (validateResult.errors.length > 0) {
    res.json({ code: 404, msg: validateResult.errors });
  }

  // 確認是否存在DB
  let member = await connection.queryAsync(
    "SELECT * FROM members WHERE email = ?",
    email
  );

  // 存在就直接丟回去，不存在則註冊
  if (member.length > 0) {
    return res.json({ code: "A10011" });
  } else {
    let now = moment().format("YYYY-MM-DD HH:MM:SS");
    password = await bcrypt.hash(password, 10);

    try {
      let savedMember = await connection.queryAsync(
        "INSERT INTO members(email, password, name, created_at, updated_at) VALUES (?)",
        [[email, password, name, now, now]]
      );
      res.send({ code: 200, data: savedMember });
    } catch (err) {
      console.log(err);
      res.send({ code: 404, msg: err });
    }
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    // 確認是否存在DB
    let member = await connection.queryAsync(
      "SELECT * FROM members WHERE email = ?",
      email
    );

    // 確認密碼是否正確
    result = await bcrypt.compare(password, member[0].password);

    // 給予回覆
    if (member && result) {
      res.json({ code: "A1002", data: member[0] });
    } else {
      res.json({ code: "A1001" });
    }
  } catch (err) {
    res.json(err);
    console.log("fuck");
  }
});

module.exports = router;
