var express = require('express');
var router = express.Router();

/* GET users listing. */
// 验证手机号
router.get('/', async function (req, res) {
  let { phone } = req.query;
  let data = await client.get("/users", { phone, findType: "exact" });
  if (data.length > 0) {
    res.send({
      status: 0
    });
  } else {
    res.send({
      status: 1
    });
  }
});

// 注册
router.post('/', async function (req, res) {
  let { phone, pwd } = req.body;
  let data = await client.post("/users", { phone, pwd });
  res.send({ "status": 1 });
});

// 登录
router.post('/login', async function (req, res) {
  let { phone, pwd } = req.body;
  let data = await client.get("/users", { phone, pwd, findType: "exact" });
  if (data.length > 0) {
    req.session.phone = phone; // 设置用户session
    res.send({ "status": 1 });
  } else {
    res.send({ "status": 0 });
  }
});

module.exports = router;