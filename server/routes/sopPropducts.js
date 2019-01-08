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
   await client.post('/sop_procducts', { name, type, makings, spec, suit, weight, taste, effect,addr, pro_date, valid_date, No,desc,price,img,shop:{ $ref:"shop",$id:shopId}})
   let shopData=await client.get("/shop/"+shopId);
   shopData.number++;
   delete shopData._id;
   await client.put("/shop/"+shopId,{...shopData});
   res.send({ status: 1 });
  });
//修改商品
router.put('/:id', async function (req, res) {
  let id = req.params.id;
  let { name, type, makings, spec, suit, weight, taste, effect,addr, pro_date, valid_date, No,desc,price,img} = req.body;
  await client.put("/sop_procducts/" + id, { name, type, makings, spec, suit, weight, taste, effect,addr, pro_date, valid_date, No,desc,price,img});
  res.send({ status: 1 });
});
//删除
router.delete('/:id', async function (req, res) {
  let id = req.params.id;
  await client.delete("/sop_procducts/"+id);
  res.send({ status: 1 });
});
module.exports = router;