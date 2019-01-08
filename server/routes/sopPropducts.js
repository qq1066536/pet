var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");
//上架
router.post('/', async function (req, res) {
    let { name, type, makings, spec, suit, weight, taste, effect,addr, pro_date, valid_date, No,desc,price,img,shopId} = req.body;
    makings = makings && JSON.parse(makings);
    spec = spec && JSON.parse(spec);
    suit = suit && JSON.parse(suit);
    weight = weight && JSON.parse(weight);
    taste = taste && JSON.parse(taste);
    effect = effect && JSON.parse(effect);
    img = img && JSON.parse(img);
    client.post('/sop_procducts', { name, type, makings, spec, suit, weight, taste, effect,addr, pro_date, valid_date, No,desc,price,img,shop:{ $ref:"shop",$id:shopId}})
    res.send({ status: 1 });
  });

module.exports = router;