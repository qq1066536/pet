var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");
//上架
//关联供应商商品
/* router.get('/sup', async function (req, res) {
  let { supId, page, rows, type, value } = req.query;//获取页码,每页显示数,搜索类型,搜索框的值
  let searchObj = {};//声明一个对象
  if (type) {
    searchObj = { [type]: value }//如果name不等于null,将name值,输入框的值传入对象;
  }
  console.log(req.query)
  let data = await client.get("/sup_products", {
    page, rows, ...searchObj,
    submitType: "findJoin",
    ref: "supplier",
    "supplier.$id": supId
  });
  console.log(data)
  res.send(data);
}); */
router.post('/', async function (req, res) {
  console.log(req.body)
  console.log(req.body.shopId)

  if (req.body.data) {
    let { data, number,shopId } = req.body
    await client.post('/sop_procducts', {
      ...data, number,
      shop: { $ref: "shop", $id: shopId }
    })
  } else {
    // let { name, type, makings, spec, suit, weight, taste, effect, addr, pro_date, valid_date, No, desc, price, img, number, shopId } = req.body;
    let {shopId } = req.body;
    delete req.body.shopId
    // makings = makings && JSON.parse(makings);
    // spec = spec && JSON.parse(spec);
    // suit = suit && JSON.parse(suit);
    // weight = weight && JSON.parse(weight);
    // taste = taste && JSON.parse(taste);
    // effect = effect && JSON.parse(effect);
    // img = img && JSON.parse(img);
    await client.post('/sop_procducts', {
      ...req.body,
      shop: { $ref: "shop", $id: shopId }
    })
  }
  // console.log(shopId)
  // let shopData = await client.get("/shop/" + shopId);
  // shopData.number++;
  // delete shopData._id;
  // await client.put("/shop/" + shopId, { ...shopData });
  res.send({ status: 1 });
});
//修改商品
router.put('/:id', async function (req, res) {
  let id = req.params.id;
  let { name, type, makings, spec, suit, weight, taste, effect, addr, pro_date, valid_date, No, desc, price, img, number } = req.body;
  await client.put("/sop_procducts/" + id, { name, type, makings, spec, suit, weight, taste, effect,
     addr, pro_date, valid_date, No, desc, price, img, number });
  res.send({ status: 1 });
});
//删除
router.delete('/:id', async function (req, res) {
  let id = req.params.id;
  await client.delete("/sop_procducts/" + id);
  res.send({ status: 1 });
});
// 查询所有供应商商品
router.get("/productsAll", async (req, res) => {
  res.send(await client.get("/sup_products"))

})
//id查询
router.get('/:id', async function (req, res) {
  let id = req.params.id;
  let data = await client.get("/sop_procducts/" + id);
  res.send(data)
});

//查找门店所有商品
router.get('/', async function (req, res) {
  let { shopId, page, rows, type, value } = req.query;//获取页码,每页显示数,搜索类型,搜索框的值
  let searchObj = {};//声明一个对象
  if (type) {
    searchObj = { [type]: value }//如果name不等于null,将name值,输入框的值传入对象;
  }
  // console.log(req.query)
  let data = await client.get("/sop_procducts", {
    page, rows, ...searchObj,
    submitType: "findJoin",
    ref: "shop",
    "shop.$id": shopId
  });
  // console.log(data)
  res.send(data);
});

//关联供应商商品
router.get('/sup', async function (req, res) {
  let { supId, page, rows, type, value } = req.query;//获取页码,每页显示数,搜索类型,搜索框的值
  let searchObj = {};//声明一个对象
  if (type) {
    searchObj = { [type]: value }//如果name不等于null,将name值,输入框的值传入对象;
  }
  // console.log(req.query)
  let data = await client.get("/sup_products", {
    page, rows, ...searchObj,
    submitType: "findJoin",
    ref: "supplier",
    "supplier.$id": supId
  });
  // console.log(data)
  res.send(data);
});
module.exports = router;