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
    let seriesDataPro = [
        [{ name: "近6个月", type: "狗粮", value: 0 }, { name: "近6个月", type: "猫粮", value: 0 }, { name: "近6个月", type: "其它", value: 0 }],
        [{ name: "近5个月", type: "狗粮", value: 0 }, { name: "近5个月", type: "猫粮", value: 0 }, { name: "近5个月", type: "其它", value: 0 }],
        [{ name: "近4个月", type: "狗粮", value: 0 }, { name: "近4个月", type: "猫粮", value: 0 }, { name: "近4个月", type: "其它", value: 0 }],
        [{ name: "近3个月", type: "狗粮", value: 0 }, { name: "近3个月", type: "猫粮", value: 0 }, { name: "近3个月", type: "其它", value: 0 }],
        [{ name: "近2个月", type: "狗粮", value: 0 }, { name: "近2个月", type: "猫粮", value: 0 }, { name: "近2个月", type: "其它", value: 0 }],
        [{ name: "近1个月", type: "狗粮", value: 0 }, { name: "近1个月", type: "猫粮", value: 0 }, { name: "近1个月", type: "其它", value: 0 }],
    ];
    let seriesDataSer = [
        [{ name: "近6个月", type: "洗护", value: 0 }, { name: "近6个月", type: "寄养", value: 0 }, { name: "近6个月", type: "其它", value: 0 }],
        [{ name: "近5个月", type: "洗护", value: 0 }, { name: "近5个月", type: "寄养", value: 0 }, { name: "近5个月", type: "其它", value: 0 }],
        [{ name: "近4个月", type: "洗护", value: 0 }, { name: "近4个月", type: "寄养", value: 0 }, { name: "近4个月", type: "其它", value: 0 }],
        [{ name: "近3个月", type: "洗护", value: 0 }, { name: "近3个月", type: "寄养", value: 0 }, { name: "近3个月", type: "其它", value: 0 }],
        [{ name: "近2个月", type: "洗护", value: 0 }, { name: "近2个月", type: "寄养", value: 0 }, { name: "近2个月", type: "其它", value: 0 }],
        [{ name: "近1个月", type: "洗护", value: 0 }, { name: "近1个月", type: "寄养", value: 0 }, { name: "近1个月", type: "其它", value: 0 }],
    ];
    let splitTrueTime = trueTime.split("-")
    console.log("splitTrueTime", splitTrueTime)
    data.forEach(function (ele) {
        if(ele.state==3){
        if (ele.buyTime.split("-")[0] == splitTrueTime[0]) {
            ele.goods.forEach(function (eles) {
                if (eles.state == 1) {
                    if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == 0) {
                        if (eles.type == "洗护") {
                            seriesDataSer[5][0].value += eles.serPrice * eles.number
                        } else if (eles.type == "寄养") {
                            seriesDataSer[5][1].value += eles.serPrice * eles.number
                        } else {
                            seriesDataSer[5][2].value += eles.serPrice * eles.number
                        }
                    } else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == 1) {
                        if (eles.type == "洗护") {
                            seriesDataSer[4][0].value += eles.serPrice * eles.number
                        } else if (eles.type == "寄养") {
                            seriesDataSer[4][1].value += eles.serPrice * eles.number
                        } else {
                            seriesDataSer[4][2].value += eles.serPrice * eles.number
                        }
                    } else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == 2) {
                        if (eles.type == "洗护") {
                            seriesDataSer[3][0].value += eles.serPrice * eles.number
                        } else if (eles.type == "寄养") {
                            seriesDataSer[3][1].value += eles.serPrice * eles.number
                        } else {
                            seriesDataSer[3][2].value += eles.serPrice * eles.number
                        }
                    } else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == 3) {
                        if (eles.type == "洗护") {
                            seriesDataSer[2][0].value += eles.serPrice * eles.number
                        } else if (eles.type == "寄养") {
                            seriesDataSer[2][1].value += eles.serPrice * eles.number
                        } else {
                            seriesDataSer[2][2].value += eles.serPrice * eles.number
                        }
                    } else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == 4) {
                        if (eles.type == "洗护") {
                            seriesDataSer[1][0].value += eles.serPrice * eles.number
                        } else if (eles.type == "寄养") {
                            seriesDataSer[1][1].value += eles.serPrice * eles.number
                        } else {
                            seriesDataSer[1][2].value += eles.serPrice * eles.number
                        }
                    } else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == 5) {
                        if (eles.type == "洗护") {
                            seriesDataSer[0][0].value += eles.serPrice * eles.number
                        } else if (eles.type == "寄养") {
                            seriesDataSer[0][1].value += eles.serPrice * eles.number
                        } else {
                            seriesDataSer[0][2].value += eles.serPrice * eles.number
                        }
                    }
                } else if (eles.state == 0) {
                    if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == 0) {
                        if (eles.type == "狗粮") {
                            seriesDataPro[5][0].value += eles.proPrice * eles.number
                        } else if (eles.type == "猫粮") {
                            seriesDataPro[5][1].value += eles.proPrice * eles.number
                        } else {
                            seriesDataPro[5][2].value += eles.proPrice * eles.number
                        }
                    } else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == 1) {
                        if (eles.type == "狗粮") {
                            seriesDataPro[4][0].value += eles.proPrice * eles.number
                        } else if (eles.type == "猫粮") {
                            seriesDataSer[4][1].value += eles.proPrice * eles.number
                        } else {
                            seriesDataPro[4][2].value += eles.proPrice * eles.number
                        }
                    } else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == 2) {
                        if (eles.type == "狗粮") {
                            seriesDataPro[3][0].value += eles.proPrice * eles.number
                        } else if (eles.type == "猫粮") {
                            seriesDataSer[3][1].value += eles.proPrice * eles.number
                        } else {
                            seriesDataPro[3][2].value += eles.proPrice * eles.number
                        }
                    } else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == 3) {
                        if (eles.type == "狗粮") {
                            seriesDataPro[2][0].value += eles.proPrice * eles.number
                        } else if (eles.type == "猫粮") {
                            seriesDataSer[2][1].value += eles.proPrice * eles.number
                        } else {
                            seriesDataPro[2][2].value += eles.proPrice * eles.number
                        }
                    } else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == 4) {
                        if (eles.type == "狗粮") {
                            seriesDataPro[1][0].value += eles.proPrice * eles.number
                        } else if (eles.type == "猫粮") {
                            seriesDataSer[1][1].value += eles.proPrice * eles.number
                        } else {
                            seriesDataPro[1][2].value += eles.proPrice * eles.number
                        }
                    } else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == 5) {
                        if (eles.type == "狗粮") {
                            seriesDataPro[0][0].value += eles.proPrice * eles.number
                        } else if (eles.type == "猫粮") {
                            seriesDataSer[0][1].value += eles.proPrice * eles.number
                        } else {
                            seriesDataPro[0][2].value += eles.proPrice * eles.number
                        }
                    }
                }
            });
        }else if(ele.buyTime.split("-")[0] !== splitTrueTime[0]){
            ele.goods.forEach(function (eles) {
                if (eles.state == 1) {
                    if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == -11) {
                        if (eles.type == "洗护") {
                            seriesDataSer[5][0].value += eles.serPrice * eles.number
                        } else if (eles.type == "寄养") {
                            seriesDataSer[5][1].value += eles.serPrice * eles.number
                        } else {
                            seriesDataSer[5][2].value += eles.serPrice * eles.number
                        }
                    }else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == -10) {
                        if (eles.type == "洗护") {
                            seriesDataSer[4][0].value += eles.serPrice * eles.number
                        } else if (eles.type == "寄养") {
                            seriesDataSer[4][1].value += eles.serPrice * eles.number
                        } else {
                            seriesDataSer[4][2].value += eles.serPrice * eles.number
                        }
                    }else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == -9) {
                        if (eles.type == "洗护") {
                            seriesDataSer[3][0].value += eles.serPrice * eles.number
                        } else if (eles.type == "寄养") {
                            seriesDataSer[3][1].value += eles.serPrice * eles.number
                        } else {
                            seriesDataSer[3][2].value += eles.serPrice * eles.number
                        }
                    }else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == -8) {
                        if (eles.type == "洗护") {
                            seriesDataSer[2][0].value += eles.serPrice * eles.number
                        } else if (eles.type == "寄养") {
                            seriesDataSer[2][1].value += eles.serPrice * eles.number
                        } else {
                            seriesDataSer[2][2].value += eles.serPrice * eles.number
                        }
                    }else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == -7) {
                        if (eles.type == "洗护") {
                            seriesDataSer[1][0].value += eles.serPrice * eles.number
                        } else if (eles.type == "寄养") {
                            seriesDataSer[1][1].value += eles.serPrice * eles.number
                        } else {
                            seriesDataSer[1][2].value += eles.serPrice * eles.number
                        }
                    }else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == -6) {
                        if (eles.type == "洗护") {
                            seriesDataSer[0][0].value += eles.serPrice * eles.number
                        } else if (eles.type == "寄养") {
                            seriesDataSer[0][1].value += eles.serPrice * eles.number
                        } else {
                            seriesDataSer[0][2].value += eles.serPrice * eles.number
                        }
                    }
                }else if(eles.state == 1){
                    if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == -11) {
                        if (eles.type == "狗粮") {
                            seriesDataPro[5][0].value += eles.proPrice * eles.number
                        } else if (eles.type == "猫粮") {
                            seriesDataPro[5][1].value += eles.proPrice * eles.number
                        } else {
                            seriesDataPro[5][2].value += eles.proPrice * eles.number
                        }
                    }else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == -10) {
                        if (eles.type == "狗粮") {
                            seriesDataPro[4][0].value += eles.proPrice * eles.number
                        } else if (eles.type == "猫粮") {
                            seriesDataPro[4][1].value += eles.proPrice * eles.number
                        } else {
                            seriesDataPro[4][2].value += eles.proPrice * eles.number
                        }
                    }else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == -9) {
                        if (eles.type == "狗粮") {
                            seriesDataPro[3][0].value += eles.proPrice * eles.number
                        } else if (eles.type == "猫粮") {
                            seriesDataPro[3][1].value += eles.proPrice * eles.number
                        } else {
                            seriesDataPro[3][2].value += eles.proPrice * eles.number
                        }
                    }else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == -8) {
                        if (eles.type == "狗粮") {
                            seriesDataPro[2][0].value += eles.proPrice * eles.number
                        } else if (eles.type == "猫粮") {
                            seriesDataPro[2][1].value += eles.proPrice * eles.number
                        } else {
                            seriesDataPro[2][2].value += eles.proPrice * eles.number
                        }
                    }else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == -7) {
                        if (eles.type == "狗粮") {
                            seriesDataPro[1][0].value += eles.proPrice * eles.number
                        } else if (eles.type == "猫粮") {
                            seriesDataPro[1][1].value += eles.proPrice * eles.number
                        } else {
                            seriesDataPro[1][2].value += eles.proPrice * eles.number
                        }
                    }else if ((splitTrueTime[1] - ele.buyTime.split("-")[1]) == -6) {
                        if (eles.type == "狗粮") {
                            seriesDataPro[0][0].value += eles.proPrice * eles.number
                        } else if (eles.type == "猫粮") {
                            seriesDataPro[0][1].value += eles.proPrice * eles.number
                        } else {
                            seriesDataPro[0][2].value += eles.proPrice * eles.number
                        }
                    }
                }
            })
        }
        console.log(ele.buyTime)
    }
    });
    console.log("6个月金额1111", seriesDataPro)
    console.log("服务", seriesDataSer)
    res.send({ axisData, seriesDataPro, seriesDataSer });
});
module.exports = router;