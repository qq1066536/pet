var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

// 根据门店id查询服务
router.get("/:id", async function (req, res) {
    let id = req.params.id;
    let data = await client.get("/services/" + id, {
        submitType: "findJoin"
        , ref: "services"
    });
    res.send(data)
})

// 根据条件查询服务
router.get('/', async function (req, res) {
    // 分页，调用函数的
    let { page, rows, type, value } = req.query;
    let searchObj = {};
    if (type) {
        searchObj = { [type]: { $regex: value || "" } };
    }
    let data = await client.get("/services", { page, rows, submitType: "findJoin", ref: "services", ...searchObj });
    res.send(data);
})


// 修改
router.put("/:id", async function (req, res) {
    let id = req.params.id;
    let { name, type, work_time_start, work_time_end, spec, servie_type, time, stuff_level, price, } = req.body;
    let data = await client.put("/services/" + id, {
        name, type, work_time_start, work_time_end, spec, servie_type, time, stuff_level, price,
    });
    res.send({ status: 1 });
})

// 增加
router.post("/", async function (req, res) {
    let { name, type, work_time_start, work_time_end, spec, servie_type, time, stuff_level, price, } = req.body;
    let data = await client.post("/services", { name, type, work_time_start, work_time_end, spec, servie_type, time, stuff_level, price, });
    res.send({
        status: 1
    })
})

// 删除
router.delete("/:id", async function (req, res) {
    let id = req.params.id;
    let data = await client.delete("/services/" + id);
    res.send({ status: 1 });
})

module.exports = router;