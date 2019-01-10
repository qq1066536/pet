var express = require('express');
var router = express.Router();
const client = require("ykt-http-client")
client.url("127.0.0.1:8080");
/* GET users listing. */
// 验证手机号
router.get('/', async function (req, res) {
  let { phone } = req.query;
  let data = await client.get("/user", { phone, findType: "exact" });
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
  let { private, phone, pwd, status } = req.body;
  let data = await client.post("/user", { private, phone, pwd, status });
  res.send({ status: 1 });
});
//注册门店账号或供应商账号
router.post('/reg', async function (req, res) {
  let { private, phone, password, status } = req.body;
  let data = await client.post("/user", { private, phone, password, status });
  res.send({ status: 1 });
})

// 登录
router.post('/login', async function (req, res) {
  let { phone, pwd } = req.body;
  let data = await client.get("/user", { phone, pwd, findType: "exact" });
  if (data.length > 0) {
    req.session.user = data[0]; // 设置用户session
    res.send({ status: 0 });
  } else {
    res.send({ status: 1 });
  }
});
//获取session
router.get("/getSession", function (req, res) {
  let user = req.session.user;
  res.send(user || {});
});
//删除session
router.get("removeSession", function (req, res) {
  req.session.user = null;
  res.send("删除成功");
});
module.exports = router;