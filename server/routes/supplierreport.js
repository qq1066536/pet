var express = require('express');
var router = express.Router();
var _ = require("lodash")
var api = require("../api")
const Axios = require("axios")
var client = require("ykt-http-client")
client.url("http://127.0.0.1:8080")
router.get("/", async (req, res) => {
    let shop = await client.get("/shop")
    shopIds = _.map(shop, "_id")
    let shops = []
    for (let i = 0; i < shopIds.length; i++) {
        console.log(shopIds[i])
        client.url("http://127.0.0.1:3000")
        let d = await client.get("/orders/shop", { id: shopIds[i], page: 1, rows: 5 })
        shops = shops.concat(d.rows)
    }
    console.log(shops)
    res.send(shops)
})
// 根据id获取每月的销量
router.get("/allorderBySupplier/:id", async (req, res) => {
    let id = req.params.id
    let orders = await client.get("/order", { submitType: "findJoin", ref: "sop_procducts" })
    // 格式化时间
    let list = _.reduce(orders, function (result, value, key) {
        console.log(value.buyTime)
        value.buyTime = value.buyTime.split(" ")[0].split("-")
        value.buyTime.pop()
        value.buyTime = value.buyTime.join("")
        result.push(value)
        return result
    }, [])
    // 过滤供应商和订单状态为已完成
    list = _.filter(list, function (item) {
        return _.isEqual(item.sop_procducts.supplier.$id, id) && _.isEqual(item.state, 3)
    })
    // 日期按照月份分组
    list = _.groupBy(list, "buytime")
    let temp=[]
    // 循环并统计每项的总和
    for(let key in list){
        let tmp={}
        let count = _.sum(_.map(list[key],"number"))
        tmp[key]=count
        temp.push(tmp)
        
    }
    res.send(temp)
})
// router.get("supplierAllList/:id",async (req,res)=>{
//     let id=req.params.id

// })
module.exports = router