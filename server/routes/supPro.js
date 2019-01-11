var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("127.0.0.1:8080");
//id查找供应商商品
router.get('/:id', async function (req, res) {
    let id = req.params.id;
    let data = await client.get("/sup_products/" + id);
    res.send(data)
  });
module.exports = router;
