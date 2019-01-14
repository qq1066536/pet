var express = require('express');
var router = express.Router();
const client = require("ykt-http-client")
client.url("127.0.0.1:8080");
const Axios = require("axios")
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
    value = decodeURI(value)
    let searcherObj = {};
    //当搜索全部是 type为null 所以不进入if
    if (type) {
        // 当进入if 就找相对应的type value
        searcherObj = { [type]: value };
    }
    let data = await client.get("/shop", { page, rows, ...searcherObj, submitType: 'findJoin', ref: 'user' });
    res.send(data);
});



//通过id查找是门店还是供货商
router.get('/findShopOrSupplier', async function (req, res) {
    let { id } = req.query;
    let data = await client.get("/shop", {
        "submitType": "findJoin", ref: "user", "user.$id": id
    })
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
    let { name, username, img_head, business_no, business_lic, legal_person, addr, location, city, tel, feature, website, vip, commission_rate, status, account } = req.body;
    let data = await client.put("/shop/" + id, { name, username, img_head, business_no, business_lic, legal_person, addr, location, city, tel, feature, website, vip, commission_rate, status, account })
    res.send(data)
})
//通过id修改供应商
router.put('/putSupplier/:id', async function (req, res) {
    let id = req.params.id;
    let { status } = req.body;
    let data = await client.put("/supplier/" + id, { status })
    res.send(data)
})

//查询user集合中字段private为门店的数据
router.get("/findUserForShop", async function (req, res) {
    let userdata = await client.get("/shop")
    let Alldata = await client.get("/user", { findType: "exact", "private": "门店" })
    for (let i = 0; i < userdata.length; i++) {
        for (let j = 0; j < Alldata.length; j++) {
            if (userdata[i].user.$id == Alldata[j]._id) {
                Alldata.splice(j, 1)
            }
        }
    }
    res.send(Alldata)
})

//获取经纬度
router.get('/addr', async (req, res) => {
    let addr = req.query.addr
    data = await Axios({
        url: "http://api.map.baidu.com/geocoder/v2/",
        method: "get",
        params: {
            address: addr,
            output: "json",
            ak: "ibu5g8aHxIdhRI4U7KntBGP1gIHI31YI",
        }
    })
    res.send(data.data)
});

//添加门店
router.post("/addShop", async function (req, res) {
    let { id, name, username, img_head, business_no, business_lic, legal_person, addr, location, city, tel, feature, website, vip, commission_rate, stuff, status, account } = req.body;
    let data = await client.post("/shop", {
        name, username, img_head, business_no, business_lic, legal_person, addr, location, city, tel, feature, website, vip, commission_rate, stuff, status, account, "user": {
            "$ref": "user",
            "$id": id
        }
    })
    res.send({ status: 1 })
})
//通过id查找门店
router.get('/findShop/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get("/shop/" + id)
    res.send(data)
})

//查询宠主
router.get("/findPetmaster", async function (req, res) {
    //type value 是页面搜索传过来的 
    let { page, rows, type, value } = req.query;
    value = decodeURI(value)
    let searcherObj = {};
    //当搜索全部是 type为null 所以不进入if
    if (type) {
        // 当进入if 就找相对应的type value
        searcherObj = { [type]: value };
    }
    let data = await client.get("/petmaster", { page, rows, ...searcherObj });
    res.send(data);
})
//修改宠主
router.put('/putPetmaster/:id', async function (req, res) {
    let id = req.params.id;
    let { account } = req.body;
    let data = await client.put("/petmaster/" + id, { account })
    res.send(data)
})

// 获取各个城市的店铺数
router.get("/counts", function (req, res) {
    const shops = [
        [120.33, 36.07, 10, "青岛"],
        [91.11, 29.97, 6, "拉萨"],
        [121.48, 31.22, 9, "上海"],
        [114.87, 40.82, 10, "张家口"],
        [121.56, 29.86, 2, "宁波"],
        [102.73, 25.04, 15, "昆明"],
        [123.38, 41.8, 7, "沈阳"],
        [104.06, 30.67, 3, "成都"],
        [116.46, 39.92, 11, "北京"]
    ];
    res.send(shops);
});

router.get("/city", function (req, res) {
    const shops = [
        [104.062275, 30.685623, "爱心宠物店", "成都通锦大厦一楼"],
        [104.079726, 30.64296, "蠢萌宠物店", "四川省成都市武侯区林荫中街8号"],
        [104.119394, 30.672233, "玲珑宠物店", "建设南路1号"],
        [104.077363, 30.600042, "卡哇伊宠物店", "天顺路225号"]
    ];
    res.send(shops);
});

router.get("/citys", async function (req, res) {
    // cityLongitudeAndLatitude 坐标
    // cityArr 城市列表
    let cityArr = []
    let cityLongitudeAndLatitude = []
    let shopData = await client.get("/shop")
    for (let i = 0; i < shopData.length; i++) {
        cityArr.push(shopData[i].city)
    }
    for (let i = 0; i < cityArr.length; i++) {
        let data = await Axios({
            url: "http://api.map.baidu.com/geocoder/v2/",
            method: "get",
            params: {
                address: cityArr[i],
                output: "json",
                ak: "ibu5g8aHxIdhRI4U7KntBGP1gIHI31YI",
            }
        })
        cityLongitudeAndLatitude.push(data.data.result.location)
    }
    let arr = [];
    for (let i = 0; i < cityArr.length; i++) {
        let tmparr = [];
        tmparr.push(cityLongitudeAndLatitude[i].lng)
        tmparr.push(cityLongitudeAndLatitude[i].lat)
        tmparr.push(cityArr[i]);
        arr.push(tmparr)
    }
    console.log(arr)
    // res.send(cityArr);
})
module.exports = router;
