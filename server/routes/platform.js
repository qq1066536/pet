var express = require('express');
var router = express.Router();
const client = require("ykt-http-client")
client.url("127.0.0.1:8080");

//查全部信息
router.get('/', async function (req, res) {
    //type value 是页面搜索传过来的 
    let { page, rows, type, value } = req.query;
    let searcherObj = {};
    //当搜索全部是 type为null 所以不进入if
    if (type) {
        // 当进入if 就找相对应的type value
        searcherObj = { [type]: value || "" };
    }
    let data = await client.get("/user");
    res.send(data);
});
// 查供货商
router.get('/supplier', async function (req, res) {
    //type value 是页面搜索传过来的 
    let { page, rows, type, value } = req.query;
    let searcherObj = {};
    //当搜索全部是 type为null 所以不进入if
    if (type) {
        // 当进入if 就找相对应的type value
        searcherObj = { [type]: value || "" };
    }
    let data = await client.get("/supplier", { page, rows, submitType: 'findJoin', ref: 'user' });
    res.send(data);
});
//添加信息
router.post('/', async function (req, res) {
    let { username, password, private, status } = req.body;
    let data = await client.post("/user", {
        username, password, private, status
    });
    res.send(data);
});
//修改信息
router.put('/:id', async function (req, res) {
    let id = req.params.id;
    let { status } = req.body;
    let data = await client.put("/user/" + id, { status });
    res.send(data);
});
//删除信息
router.delete('/:id', async function (req, res) {
    let id = req.params.id;
    await client.delete("/user/" + id);
    res.send({ status: 1 });
});

// 查全部门店
router.get('/shop', async function (req, res) {
    //type value 是页面搜索传过来的 
    let { page, rows, type, value } = req.query;
    let searcherObj = {};
    //当搜索全部是 type为null 所以不进入if
    if (type) {
        // 当进入if 就找相对应的type value
        searcherObj = { [type]: value || "" };
    }
    let data = await client.get("/shop", { page, rows, submitType: 'findJoin', ref: 'user' });
    res.send(data);
});


//查询全部供货商和全部门店的集合
router.get('/findAll', async function (req, res) {
    let { page, rows, type, value } = req.query;
    let shopData = await client.get("/shop", { submitType: 'findJoin', ref: 'user' });
    let supplierData = await client.get("/supplier", { submitType: 'findJoin', ref: 'user' });
    let data = shopData.concat(supplierData);
    res.send(data)
})

//验证手机号是否重复
router.get('/findPhone', async function (req, res) {
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
//注册门店账号或供应商账号
router.post('/reg', async function (req, res) {
    let { private, phone, password, status } = req.body;
    let data = await client.post("/user", { private, phone, password, status });
    res.send({ status: 1 });
})
module.exports = router;
