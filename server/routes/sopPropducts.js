var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");
//上架
router.post('/', async function (req, res) {
  let { name, type, makings, spec, suit, weight, taste, effect, addr, pro_date, valid_date, No, desc, price, img,number, shopId } = req.body;
  makings = makings && JSON.parse(makings);
  spec = spec && JSON.parse(spec);
  suit = suit && JSON.parse(suit);
  weight = weight && JSON.parse(weight);
  taste = taste && JSON.parse(taste);
  effect = effect && JSON.parse(effect);
  img = img && JSON.parse(img);
  await client.post('/sop_procducts', {
    name, type, makings, spec, suit, weight, taste, effect, addr, pro_date, valid_date, No, desc, price, img,number,
    shop: { $ref: "shop", $id:shopId}
  })
  let shopData = await client.get("/shop/" + shopId);
  shopData.number++;
  delete shopData._id;
  await client.put("/shop/" + shopId, { ...shopData });
  res.send({ status: 1 });
});
//修改商品
router.put('/:id', async function (req, res) {
  let id = req.params.id;
  let { name, type, makings, spec, suit, weight, taste, effect, addr, pro_date, valid_date, No, desc, price, img,number } = req.body;
  await client.put("/sop_procducts/" + id, { name, type, makings, spec, suit, weight, taste, effect, addr, pro_date, valid_date, No, desc, price, img,number });
  res.send({ status: 1 });
});
//删除
router.delete('/:id', async function (req, res) {
  let id = req.params.id;
  await client.delete("/sop_procducts/" + id);
  res.send({ status: 1 });
});
//id查询
router.get('/:id', async function (req, res) {
  let id = req.params.id;
  let data = await client.get("/sop_procducts/" + id);
  res.send(data)
});

router.get('/', async function (req, res) {
  let { id, page, rows, type, value } = req.query;//获取页码,每页显示数,搜索类型,搜索框的值
  let searchObj = {};//声明一个对象
  if (type) {
    searchObj = { [type]: value }//如果name不等于null,将name值,输入框的值传入对象;
  }
  console.log(req.query)
  let data = await client.get("/sop_procducts", {
    page, rows, ...searchObj,
    "submitType": "findJoin",
    ref: "shop",
    "shop.$id": id
  });
  console.log(data)
  res.send(data);
});

// router.get("/", async function (req, res) {
//   let { page, rows, value, type } = req.query;
//   let data = await client.get("/sop_procducts", {
//     page,
//     rows,
//     findType: "exact",
//     submitType: "findJoin", ref: "sop_procducts",
//   });
//   console.log(type, value)
//   if (type) {
//     let isCludes;
//     for (let i = 0; i < data.rows.length; i++) {
//       isCludes = _.includes(data.rows[i].order[type], value); // 数据中是否包含value
//       if (!isCludes) {
//         data.rows.splice(i, 1);
//         i--;
//       }
//     }
//     // 总共的条数
//     if (value != '') {
//       data.total = data.rows.length;
//     }
//     // 当前页
//     data.curpage = parseInt(data.total / data.eachpage) || 1;
//   }
//   res.send(data);
// })
module.exports = router;