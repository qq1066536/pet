var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

/* GET users listing. */
// 根据门店id查询订单
router.get("/", async function (req, res) {
    // console.log(new Date(Date.parse(req.query.chooseYear)).toLocaleDateString())
    let { id, chooseYear } = req.query;
    let dataShop = await client.get("/shop", {
        "submitType": "findJoin",
        ref: "user",
        "user.$id": id,
    })
    // console.log(dataShop)
    let data = await client.get("/order", {
        "submitType": "findJoin",
        ref: "shop",
        "shop.$id": dataShop[0]._id,
    });
    // console.log(data);
    let axisDataMonth = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    let axisDataQuarter = ["1季度", "2季度", "3季度", "4季度"];
    let seriesDataService = [
        [{ name: "1月", type: "寄养", value: 0 }, { name: "1月", type: "洗护", value: 0 }, { name: "1月", name: "其他", value: 0 }],
        [{ name: "2月", type: "寄养", value: 0 }, { name: "2月", type: "洗护", value: 0 }, { name: "2月", name: "其他", value: 0 }],
        [{ name: "3月", type: "寄养", value: 0 }, { name: "3月", type: "洗护", value: 0 }, { name: "3月", name: "其他", value: 0 }],
        [{ name: "4月", type: "寄养", value: 0 }, { name: "4月", type: "洗护", value: 0 }, { name: "4月", name: "其他", value: 0 }],
        [{ name: "5月", type: "寄养", value: 0 }, { name: "5月", type: "洗护", value: 0 }, { name: "5月", name: "其他", value: 0 }],
        [{ name: "6月", type: "寄养", value: 0 }, { name: "6月", type: "洗护", value: 0 }, { name: "6月", name: "其他", value: 0 }],
        [{ name: "7月", type: "寄养", value: 0 }, { name: "7月", type: "洗护", value: 0 }, { name: "7月", name: "其他", value: 0 }],
        [{ name: "8月", type: "寄养", value: 0 }, { name: "8月", type: "洗护", value: 0 }, { name: "8月", name: "其他", value: 0 }],
        [{ name: "9月", type: "寄养", value: 0 }, { name: "9月", type: "洗护", value: 0 }, { name: "9月", name: "其他", value: 0 }],
        [{ name: "10月", type: "寄养", value: 0 }, { name: "10月", type: "洗护", value: 0 }, { name: "10月", name: "其他", value: 0 }],
        [{ name: "11月", type: "寄养", value: 0 }, { name: "11月", type: "洗护", value: 0 }, { name: "11月", name: "其他", value: 0 }],
        [{ name: "12月", type: "寄养", value: 0 }, { name: "12月", type: "洗护", value: 0 }, { name: "12月", name: "其他", value: 0 }],]
    let seriesDataPro = [
        [{ name: "1月", type: "猫粮", value: 0 }, { name: "1月", type: "狗粮", value: 0 }, { name: "1月", type: "其他", value: 0 }],
        [{ name: "2月", type: "猫粮", value: 0 }, { name: "2月", type: "狗粮", value: 0 }, { name: "2月", type: "其他", value: 0 }],
        [{ name: "3月", type: "猫粮", value: 0 }, { name: "3月", type: "狗粮", value: 0 }, { name: "3月", type: "其他", value: 0 }],
        [{ name: "4月", type: "猫粮", value: 0 }, { name: "4月", type: "狗粮", value: 0 }, { name: "4月", type: "其他", value: 0 }],
        [{ name: "5月", type: "猫粮", value: 0 }, { name: "5月", type: "狗粮", value: 0 }, { name: "5月", type: "其他", value: 0 }],
        [{ name: "6月", type: "猫粮", value: 0 }, { name: "6月", type: "狗粮", value: 0 }, { name: "6月", type: "其他", value: 0 }],
        [{ name: "7月", type: "猫粮", value: 0 }, { name: "7月", type: "狗粮", value: 0 }, { name: "7月", type: "其他", value: 0 }],
        [{ name: "8月", type: "猫粮", value: 0 }, { name: "8月", type: "狗粮", value: 0 }, { name: "8月", type: "其他", value: 0 }],
        [{ name: "9月", type: "猫粮", value: 0 }, { name: "9月", type: "狗粮", value: 0 }, { name: "9月", type: "其他", value: 0 }],
        [{ name: "10月", type: "猫粮", value: 0 }, { name: "10月", type: "狗粮", value: 0 }, { name: "10月", type: "其他", value: 0 }],
        [{ name: "11月", type: "猫粮", value: 0 }, { name: "11月", type: "狗粮", value: 0 }, { name: "11月", type: "其他", value: 0 }],
        [{ name: "12月", type: "猫粮", value: 0 }, { name: "12月", type: "狗粮", value: 0 }, { name: "12月", type: "其他", value: 0 }],
    ];
    let seriesDataProQuter = [
        [{ name: "1季度", type: "猫粮", value: 0 }, { name: "1季度", type: "狗粮", value: 0 }, { name: "1季度", type: "其他", value: 0 }],
        [{ name: "2季度", type: "猫粮", value: 0 }, { name: "2季度", type: "狗粮", value: 0 }, { name: "2季度", type: "其他", value: 0 }],
        [{ name: "3季度", type: "猫粮", value: 0 }, { name: "3季度", type: "狗粮", value: 0 }, { name: "3季度", type: "其他", value: 0 }],
        [{ name: "4季度", type: "猫粮", value: 0 }, { name: "4季度", type: "狗粮", value: 0 }, { name: "4季度", type: "其他", value: 0 }],
    ];
    let seriesDataServiceQuter = [
        [{ name: "1季度", type: "寄养", value: 0 }, { name: "1季度", type: "洗护", value: 0 }, { name: "1季度", type: "其他", value: 0 }],
        [{ name: "2季度", type: "寄养", value: 0 }, { name: "2季度", type: "洗护", value: 0 }, { name: "2季度", type: "其他", value: 0 }],
        [{ name: "3季度", type: "寄养", value: 0 }, { name: "3季度", type: "洗护", value: 0 }, { name: "3季度", type: "其他", value: 0 }],
        [{ name: "4季度", type: "寄养", value: 0 }, { name: "4季度", type: "洗护", value: 0 }, { name: "4季度", type: "其他", value: 0 }],
    ];
    let seriesDataProYear = [
        { name: "猫粮", type: "猫粮", value: 0 }, { name: "狗粮", type: "狗粮", value: 0 }, { name: "其他", type: "其他", value: 0 },
    ];
    let seriesDataServiceYear = [
        { name: "寄养", type: "寄养", value: 0 }, { name: "洗护", type: "洗护", value: 0 }, { name: "其他", type: "其他", value: 0 },
    ];
    let time = [];
    if (data.length > 1) {
        // console.log(data[0].buyTime)
        time = data[0].buyTime.split("-");
    } else if(data.length==1){
        time = data.buyTime.split("-");
    }else{
        time=new Date(Date.parse("1970/01/01"))
    }
    chooseYear = new Date(Date.parse(chooseYear)).toLocaleDateString().split("-")[0];
    // console.log(chooseYear,time[0])
    data.forEach(function (ele) {
        if (time[0] == chooseYear && time[1] == 1) {
            ele.goods.forEach(function (el) {
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataPro[0][2].value += parseInt(el.number);
                        // console.log(seriesDataPro[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataPro[0][1].value += parseInt(el.number);
                    } else {
                        seriesDataPro[0][0].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataService[0][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataService[0][1].value += parseInt(el.number);
                    } else {
                        seriesDataService[0][2].value += parseInt(el.number);
                    }
                }
            })
        }
        else if (time[0] == chooseYear && time[1] == 2) {
            ele.goods.forEach(function (el) {
                // console.log(el);
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataPro[1][2].value += parseInt(el.number);
                        // console.log(seriesDataPro[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataPro[1][1].value += parseInt(el.number);
                    } else {
                        seriesDataPro[1][0].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataService[1][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataService[1][1].value += parseInt(el.number);
                    } else {
                        seriesDataService[1][2].value += parseInt(el.number);
                    }
                }
            })
        }
        else if (time[0] == chooseYear && time[1] == 4) {
            ele.goods.forEach(function (el) {
                // console.log(el);
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataPro[2][2].value += parseInt(el.number);
                        // console.log(seriesDataPro[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataPro[2][1].value += parseInt(el.number);
                    } else {
                        seriesDataPro[2][0].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataService[2][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataService[2][1].value += parseInt(el.number);
                    } else {
                        seriesDataService[2][2].value += parseInt(el.number);
                    }
                }
            })
        }
        else if (time[0] == chooseYear && time[1] == 4) {
            ele.goods.forEach(function (el) {
                // console.log(el);
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataPro[3][2].value += parseInt(el.number);
                        // console.log(seriesDataPro[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataPro[3][1].value += parseInt(el.number);
                    } else {
                        seriesDataPro[3][0].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataService[3][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataService[3][1].value += parseInt(el.number);
                    } else {
                        seriesDataService[3][2].value += parseInt(el.number);
                    }
                }
            })
        }
        else if (time[0] == chooseYear && time[1] == 5) {
            ele.goods.forEach(function (el) {
                // console.log(el);
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataPro[4][2].value += parseInt(el.number);
                        // console.log(seriesDataPro[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataPro[4][1].value += parseInt(el.number);
                    } else {
                        seriesDataPro[4][0].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataService[4][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataService[4][1].value += parseInt(el.number);
                    } else {
                        seriesDataService[4][2].value += parseInt(el.number);
                    }
                }
            })
        }
        else if (time[0] == chooseYear && time[1] == 6) {
            ele.goods.forEach(function (el) {
                // console.log(el);
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataPro[5][2].value += parseInt(el.number);
                        // console.log(seriesDataPro[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataPro[5][1].value += parseInt(el.number);
                    } else {
                        seriesDataPro[5][0].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataService[5][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataService[5][1].value += parseInt(el.number);
                    } else {
                        seriesDataService[5][2].value += parseInt(el.number);
                    }
                }
            })
        }
        else if (time[0] == chooseYear && time[1] == 7) {
            ele.goods.forEach(function (el) {
                // console.log(el);
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataPro[6][2].value += parseInt(el.number);
                        // console.log(seriesDataPro[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataPro[6][1].value += parseInt(el.number);
                    } else {
                        seriesDataPro[6][0].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataService[6][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataService[6][1].value += parseInt(el.number);
                    } else {
                        seriesDataService[6][2].value += parseInt(el.number);
                    }
                }
            })
        }
        else if (time[0] == chooseYear && time[1] == 8) {
            ele.goods.forEach(function (el) {
                // console.log(el);
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataPro[7][2].value += parseInt(el.number);
                        // console.log(seriesDataPro[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataPro[7][1].value += parseInt(el.number);
                    } else {
                        seriesDataPro[7][0].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataService[7][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataService[7][1].value += parseInt(el.number);
                    } else {
                        seriesDataService[7][2].value += parseInt(el.number);
                    }
                }
            })
        }
        else if (time[0] == chooseYear && time[1] == 9) {
            ele.goods.forEach(function (el) {
                // console.log(el);
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataPro[8][2].value += parseInt(el.number);
                        // console.log(seriesDataPro[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataPro[8][1].value += parseInt(el.number);
                    } else {
                        seriesDataPro[8][0].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataService[8][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataService[8][1].value += parseInt(el.number);
                    } else {
                        seriesDataService[8][2].value += parseInt(el.number);
                    }
                }
            })
        }
        else if (time[0] == chooseYear && time[1] == 10) {
            ele.goods.forEach(function (el) {
                // console.log(el);
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataPro[9][2].value += parseInt(el.number);
                        // console.log(seriesDataPro[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataPro[9][1].value += parseInt(el.number);
                    } else {
                        seriesDataPro[9][0].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataService[9][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataService[9][1].value += parseInt(el.number);
                    } else {
                        seriesDataService[9][2].value += parseInt(el.number);
                    }
                }
            })
        }
        else if (time[0] == chooseYear && time[1] == 11) {
            ele.goods.forEach(function (el) {
                // console.log(el);
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataPro[10][2].value += parseInt(el.number);
                        // console.log(seriesDataPro[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataPro[10][1].value += parseInt(el.number);
                    } else {
                        seriesDataPro[10][0].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataService[10][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataService[10][1].value += parseInt(el.number);
                    } else {
                        seriesDataService[10][2].value += parseInt(el.number);
                    }
                }
            })
        } else if (time[0] == chooseYear && time[1] == 12) {
            ele.goods.forEach(function (el) {
                // console.log(el);
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataPro[11][2].value += parseInt(el.number);
                        // console.log(seriesDataPro[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataPro[11][1].value += parseInt(el.number);
                    } else {
                        seriesDataPro[11][0].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataService[11][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataService[11][1].value += parseInt(el.number);
                    } else {
                        seriesDataService[11][2].value += parseInt(el.number);
                    }
                }
            })
        }
    });
    data.forEach(function (ele) {
        if (time[0] == chooseYear && (time[1] == 1 || time[1] == 2 || time[1] == 3)) {
            ele.goods.forEach(function (el) {
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataProQuter[0][0].value += parseInt(el.number);
                        // console.log(seriesDataProQuter[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataProQuter[0][1].value += parseInt(el.number);
                    } else {
                        seriesDataProQuter[0][2].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataServiceQuter[0][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataServiceQuter[0][1].value += parseInt(el.number);
                    } else {
                        seriesDataServiceQuter[0][2].value += parseInt(el.number);
                    }
                }
            })
        }
        else if (time[0] == chooseYear && (time[1] == 4 || time[1] == 5 || time[1] == 6)) {
            ele.goods.forEach(function (el) {
                // console.log(el);
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataProQuter[1][0].value += parseInt(el.number);
                        // console.log(seriesDataProQuter[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataProQuter[1][1].value += parseInt(el.number);
                    } else {
                        seriesDataProQuter[1][2].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataServiceQuter[1][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataServiceQuter[1][1].value += parseInt(el.number);
                    } else {
                        seriesDataServiceQuter[1][2].value += parseInt(el.number);
                    }
                }
            })
        }
        else if (time[0] == chooseYear && (time[1] == 7 || time[1] == 8 || time[1] == 9)) {
            ele.goods.forEach(function (el) {
                // console.log(el);
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataProQuter[2][0].value += parseInt(el.number);
                        // console.log(seriesDataProQuter[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataProQuter[2][1].value += parseInt(el.number);
                    } else {
                        seriesDataProQuter[2][2].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataServiceQuter[2][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataServiceQuter[2][1].value += parseInt(el.number);
                    } else {
                        seriesDataServiceQuter[2][2].value += parseInt(el.number);
                    }
                }
            })
        }
        else if (time[0] == chooseYear && (time[1] == 10 || time[1] == 11 || time[1] == 12)) {
            ele.goods.forEach(function (el) {
                // console.log(el);
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataProQuter[3][0].value += parseInt(el.number);
                        // console.log(seriesDataProQuter[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataProQuter[3][1].value += parseInt(el.number);
                    } else {
                        seriesDataProQuter[3][2].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataServiceQuter[3][0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataServiceQuter[3][1].value += parseInt(el.number);
                    } else {
                        seriesDataServiceQuter[3][2].value += parseInt(el.number);
                    }
                }
            })
        }
    })
    data.forEach(function (ele) {
        if (time[0] == chooseYear) {
            ele.goods.forEach(function (el) {
                if (el.state == 0) {
                    if (el.type == "猫粮") {
                        seriesDataProYear[0].value += parseInt(el.number);
                        // console.log(seriesDataProYear[1].value)
                    } else if (el.type == "狗粮") {
                        seriesDataProYear[1].value += parseInt(el.number);
                    } else {
                        seriesDataProYear[2].value += parseInt(el.number);
                    }
                } else {
                    if (el.type == "寄养") {
                        seriesDataServiceYear[0].value += parseInt(el.number);
                    } else if (el.type == "洗护") {
                        seriesDataServiceYear[1].value += parseInt(el.number);
                    } else {
                        seriesDataServiceYear[2].value += parseInt(el.number);
                    }
                }
            })
        }
    })
    res.send({ axisDataMonth, axisDataQuarter, seriesDataService, seriesDataPro, seriesDataProQuter, seriesDataServiceQuter, seriesDataProYear, seriesDataServiceYear });
})


module.exports = router;