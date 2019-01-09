var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");
//注册门店
router.post('/', async function (req, res) {
    let { name, addr, business_lic, desc, business_no, location, city, legal_person, tel, img_head,feature,vip,package,stuff,status,userId} = req.body;
    location = location && JSON.parse(location);
    stuff = stuff && JSON.parse(stuff);
    let { name, addr, business_lic, desc, business_no, location, city, legal_person, tel, img_head,feature,vip,package,stuff,status,userId} = req.body;
    client.post('/shop', { name, addr, business_lic, desc, products, business_no, location, city, legal_person, tel, img_head,feature,vip,package,stuff,status,user:{ $ref:"user",$id:userId}})
    res.send({ status: 1 });
  });
  //查找门店
  router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get("/shop/" + id);
    res.send(data);
  })

module.exports = router;