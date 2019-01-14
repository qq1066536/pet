var express = require('express');
var router = express.Router();
const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

// 店铺所有商品近6个月的月销售额统计
router.get('/', async function (req, res) {
    let { trueTime, sessionId } = req.query;
    console.log("trueTime", trueTime)
    console.log("Id", sessionId)
    let shopData = await client.get("/shop", { submitType: "findJoin", ref: "user", "user.$id": sessionId, });
    // console.log("门店", shopData)
    let data = await client.get("/order", { submitType: "findJoin", ref: "shop", "shop.$id": shopData[0]._id, })
    console.log("订单", data)
    let axisData = ["近6个月", "近5个月", "近4个月", "近3个月", "近2个月", "近1个月"];
    let seriesData = [{ name: "近6个月", value: 0 }, { name: "近5个月", value: 0 }, { name: "近4个月", value: 0 }, { name: "近3个月", value: 0 }, { name: "近2个月", value: 0 }, { name: "近1个月", value: 0 }];
    let splitTrueTime = trueTime.split("/")
    console.log("splitTrueTime", splitTrueTime)
    data.forEach(function (ele) {
        if (ele.buyTime.split("/")[0] == splitTrueTime[0]) {
            console.log("购买时间", ele.buyTime.split("/")[0])
            if ((splitTrueTime[1] - ele.buyTime.split("/")[1]) == 0) {
                // console.log("购买月份",(splitTrueTime[1] - ele.buyTime.split("/")[1]))
                // if (ele.state == 3) {
                ele.goods.forEach(function (eles) {
                    // console.log("elesaaaaaaaaaa", eles)
                    if (eles.state == 0) {
                        console.log("商品订单", eles)
                        if (eles.type == "狗粮") {
                            console.log("狗粮", eles)
                            seriesData[5].value += eles.proPrice * eles.number;
                            console.log("金额", seriesData[5].value)
                        }
                    }
                });
                // }
            } else if ((splitTrueTime[1] - ele.buyTime.split("/")[1]) == 1) {
                if (eles.state == 0) {
                    console.log("商品订单", eles)
                    if (eles.type == "狗粮") {
                        seriesData[4].value += eles.proPrice * eles.number;
                    }
                }
            } else if ((splitTrueTime[1] - ele.buyTime.split("/")[1]) == 2) {
                if (eles.state == 0) {
                    console.log("商品订单", eles)
                    if (eles.type == "狗粮") {
                        seriesData[3].value += eles.proPrice * eles.number;
                    }
                }
            } else if ((splitTrueTime[1] - ele.buyTime.split("/")[1]) == 3) {
                if (eles.state == 0) {
                    console.log("商品订单", eles)
                    if (eles.type == "狗粮") {
                        seriesData[2].value += eles.proPrice * eles.number;
                    }
                }
            } else if ((splitTrueTime[1] - ele.buyTime.split("/")[1]) == 4) {
                if (eles.state == 0) {
                    console.log("商品订单", eles)
                    if (eles.type == "狗粮") {
                        seriesData[1].value += eles.proPrice * eles.number;
                    }
                }
            } else if ((splitTrueTime[1] - ele.buyTime.split("/")[1]) == 5) {
                if (eles.state == 0) {
                    console.log("商品订单", eles)
                    if (eles.type == "狗粮") {
                        seriesData[0].value += eles.proPrice * eles.number;
                        console.log("近6个月金额", seriesData[0].value)
                    }
                }
            }

        }
        console.log(ele.buyTime)
    });
    console.log("6个月金额1111",seriesData)
    res.send({ axisData, seriesData });
});

module.exports = router;