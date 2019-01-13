var express = require('express');
var router = express.Router();
const session = require('express-session');
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");

// 店铺所有商品近6个月的月销售额统计
router.get('/',async function(req,res){
    let {trueTime,shopId}=req.query;
    console.log("trueTime",trueTime)
    let data = await client.get("/order",{submitType: "findJoin", ref: ["shop"], "shop.$id": shopId, });
    let axisData = ["近1个月","近2个月","近3个月","近4个月","近5个月","近6个月"];
    let seriesData = [{name:"近1个月",value:0},{name:"近2个月",value:0},{name:"近3个月",value:0},{name:"近4个月",value:0},{name:"近5个月",value:0},{name:"近6个月",value:0}];
    let splitTrueTime=trueTime.split("/")
    console.log("splitTrueTime",splitTrueTime)
    data.forEach(function(ele){
        // if(ele.orderContent=="购买商品"){
        //     if(ele.buyTime.split("/")[0]==splitTrueTime[0]){
        //         if((splitTrueTime[1]-ele.buyTime.split("/")[1])==0){
        //             for(let i=0;i<ele.orderCommoditys.length;i++){
        //                 seriesData[0].value+=ele.orderCommoditys[i].commodityCondition*ele.orderCommoditys[i].commodityPrice;
        //             }
        //         }else if((splitTrueTime[1]-ele.buyTime.split("/")[1])==2){
        //             for(let i=0;i<ele.orderCommoditys.length;i++){
        //                 seriesData[1].value+=ele.orderCommoditys[i].commodityCondition*ele.orderCommoditys[i].commodityPrice;
        //             }
        //         }else if((splitTrueTime[1]-ele.buyTime.split("/")[1])==3){
        //             for(let i=0;i<ele.orderCommoditys.length;i++){
        //                 seriesData[2].value+=ele.orderCommoditys[i].commodityCondition*ele.orderCommoditys[i].commodityPrice;
        //             }
        //         }else if((splitTrueTime[1]-ele.buyTime.split("/")[1])==4){
        //             for(let i=0;i<ele.orderCommoditys.length;i++){
        //                 seriesData[3].value+=ele.orderCommoditys[i].commodityCondition*ele.orderCommoditys[i].commodityPrice;
        //             }
        //         }else if((splitTrueTime[1]-ele.buyTime.split("/")[1])==5){
        //             for(let i=0;i<ele.orderCommoditys.length;i++){
        //                 seriesData[4].value+=ele.orderCommoditys[i].commodityCondition*ele.orderCommoditys[i].commodityPrice;
        //             }
        //         }else if((splitTrueTime[1]-ele.buyTime.split("/")[1])==6){
        //             for(let i=0;i<ele.orderCommoditys.length;i++){
        //                 seriesData[5].value+=ele.orderCommoditys[i].commodityCondition*ele.orderCommoditys[i].commodityPrice;
        //             }
        //         }
        //     }
        // }

        // if(ele.age < 18){
        //     seriesData[0].value++;
        // }
        // else if(ele.age >= 18 && ele.age <= 30){
        //     seriesData[1].value++;
        // }else{
        //     seriesData[2].value++;
        // }
        console.log(ele.buyTime)
    });
    res.send({axisData,seriesData});
});

module.exports = router;