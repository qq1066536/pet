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
    let id = req.query.id;
    let {page ,rows}=req.query
    let data = await client.get("/order",{ 
        page,rows,
        "submitType":"findJoin",
        ref:"shop",
        "shop.$id": id,
    });
    // data=data.filter(item=>item.shop._id==id)
    res.send(data)
})

// 根据条件查询订单
router.get("/", async function (req, res) {
    let { page, rows, value, type } = req.query;
    let data = await client.get("/order", {
        page,
        rows,
        findType: "exact",
        submitType: "findJoin", ref: "order",
    });
    console.log(type,value)
    if (type) {
        let isCludes;
        for (let i = 0; i < data.rows.length; i++) {
            isCludes = _.includes(data.rows[i].order[type], value); // 数据中是否包含value
            if (!isCludes) {
                data.rows.splice(i, 1);
                i--;
            }
        }
        // 总共的条数
        if (value != '') {
            data.total = data.rows.length;
        }
        // 当前页
        data.curpage = parseInt(data.total / data.eachpage) || 1;
    }
    res.send(data);
})
router.get("/:id", async function(req,res){
    let id = req.params.id;
    let data = await client.get("/order/"+id);
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