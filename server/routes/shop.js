var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
const Axios = require("axios")
client.url("127.0.0.1:8080");
//注册门店
router.post('/', async function (req, res) {
  console.log(123)
  let { name, addr, business_lic, desc, business_no, location, city, legal_person, tel, img_head, feature, vip, package, stuff, status, userId } = req.body;
  location = location && JSON.parse(location);
  stuff = stuff && JSON.parse(stuff);
  // let { name, addr, business_lic, desc, business_no, location, city, legal_person, tel, img_head, feature, vip, package, stuff, status, userId } = req.body;
  await client.post('/shop', {
    name, addr, business_lic, desc, business_no, location, city,
    legal_person, tel, img_head, feature, vip, package, stuff, status, user: { $ref: "user", $id: userId }
  })
  res.send({ status: 1 });
});
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
//查找门店
router.get('/:id', async function (req, res) {
  let id = req.params.id;
  let data = await client.get("/shop/" + id);
  res.send(data);
})

module.exports = router;