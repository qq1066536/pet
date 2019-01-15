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
    let orders = await client.get("/order")
    // 格式化时间
    let list = _.reduce(orders, function (result, value, key) {
        value.buyTime = value.buyTime.split(" ")[0].split("-")
        value.buyTime.pop()
        value.buyTime = value.buyTime.join("")
        result.push(value)
        return result
    }, [])
    // 过滤供应商和订单状态为已完成
    list = _.filter(list, function (item) {
        return _.isEqual(item.state, 3)
    })
    let temp = []
    // 按月汇总指定的数据
    _.each(list, function (item) {
        let tmp = {}
        tmp['month'] = item.buyTime
        // 过滤掉没有supplier的商品并求和
        tmp["count"] = _.sum(_.map(item.goods, function (item) {
            if (item.supplierId == id) {
                return item.number
            } else {
                return 0
            }
        }))
        temp.push(tmp)
    })
    // 过滤掉数据为0 的数据
    temp = _.filter(temp, item => {
        return item.count != 0
    })
    let result = []
    // 组合成指定的类型[{"月份": 当月金额},{"月份": 当月金额}]
    _.each(_.groupBy(temp, "month"), function (item, key) {
        let tmp = {}
        tmp[key] = _.sum(_.map(item, "count"))
        result.push(tmp)
    })
    res.send(result)
})
module.exports = router