var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

// 根据门店id查询服务
router.get("/:id", async function (req, res) {
    let id = req.params.id;
    let data = await client.get("/order/" + id, {
        submitType: "findJoin"
        , ref: "shop"
    });
    res.send(data)
})

//修改
router.put("/:id", async function (req, res) {
    let id = req.params.id; 
    let { user, addr, phone } = req.body;
    let data = await client.put("/order/" + id, {
        user, addr, phone
    });
    res.send({ status: 1 });
})

module.exports = router;