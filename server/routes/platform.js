
var express = require('express');
var router = express.Router();
const client = require("ykt-http-client")
client.url("127.0.0.1:8080");

//查全部用户信息
router.get('/', async function (req, res) {
    //type value 是页面搜索传过来的 
    let { page, rows, type, value } = req.query;
    value = decodeURI(value)
    let searcherObj = {};
    //当搜索全部是 type为null 所以不进入if
    if (type) {
        // 当进入if 就找相对应的type value
        searcherObj = { [type]: value };

    }
    let data = await client.get("/user", { page, rows, ...searcherObj });
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



//通过id查找是门店还是供货商
router.get('/findShopOrSupplier', async function (req, res) {
    let { id } = req.query;
    let data = await client.get("/shop", { "submitType": "findJoin", ref: "user", "user.$id": id })
    if (data.length == 0) {
        data = await client.get("/supplier", { "submitType": "findJoin", ref: "user", "user.$id": id, })
    }
    res.send(data)
})

//通过id修改权限
router.put('/putStatus/:id', async function (req, res) {
    let id = req.params.id;
    let { phone, password, status, account } = req.body;
    let data = await client.put("/user/" + id, { phone, password, status, account })
    res.send({ status: 1 })
})
//通过id查询用户信息
router.get('/findUser/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get("/user/" + id)
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
    let { private, phone, password, status, account } = req.body;
    let data = await client.post("/user", { private, phone, password, status, account });
    res.send({ status: 1 });
})
//通过id修改门店
router.put('/putShop/:id', async function (req, res) {
    let id = req.params.id;
    let { status } = req.body;
    let data = await client.put("/shop/" + id, { status })
    res.send(data)
})
//通过id修改供应商
router.put('/putSupplier/:id', async function (req, res) {
    let id = req.params.id;
    let { status } = req.body;
    let data = await client.put("/supplier/" + id, { status })
    res.send(data)
})
module.exports = router;
