var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */
/* router.get("/", async function (req, res) {
    let data = await client.get("/order");
    res.send(data);
}) */
// 根据门店id查询订单
router.get("/shop", async function (req, res) {
    let { id, page, rows, type, value } = req.query;
    let searchObj = {};
    if (type) {
        searchObj = { type: value };
    }
    let data = await client.get("/order", {
        page, rows,
        "submitType": "findJoin",
        ref: "shop",
        "shop.$id": id,
        ...searchObj
    });
    res.send(data)
})

// 根据条件查询服务
router.get('/', async function (req, res) {
    // 分页，调用函数的
    let { page, rows, type, value } = req.query;
    let searchObj = {};
    if (type) {
        searchObj = { type: value };
    }
    let data = await client.get("/order", { page, rows, submitType: "findJoin", ref: "order", ...searchObj });
    res.send(data);
})

// 根据id查询订单
router.get("/:id", async function (req, res) {
    let id = req.params.id;
    let data = await client.get("/order/" + id);
    res.send(data);
})
//修改
router.put("/:id", async function (req, res) {
    let id = req.params.id; // 订单的id
    let { user, addr, phone } = req.body;
    let data = await client.put("/order/" + id, {
        user, addr, phone
    });
    res.send({ status: 1 });
})


module.exports = router;