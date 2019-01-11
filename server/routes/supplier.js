var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("http://127.0.0.1:8080")
//获取某供应商数据
router.get("/", async (req, res) => {
    let { id, page, rows } = req.query
    console.log(id, page, rows)
    let data = await client.get(`/sup_products`, { submitType: "findJoin", ref: "supplier" })
    data = data.filter(item => item.supplier._id == id)
    console.log(data)
    res.send(data)
})
router.get("/:id", async (req, res) => {
    let proid=req.params.id
    let { id } = req.query
    let data = await client.get(`/sup_products/`+proid, {
        "submitType": "findJoin",
        ref: "supplier",
        "supplier.$id": id,
    })
    // data = data.rows.filter(item => item.supplier._id == id)
    console.log("getProduct",data)
    res.send(data)
})
// 新增产品数据，id为供应商id
router.post("/:id", async (req, res) => {
    let id = req.params.id;
    let reqdata = req.body
    console.log(reqdata)
    let data = await client.post("/sup_products", {
        ...reqdata, supplier: {
            "$ref": "supplier",
            "$id": id
        }
    })
    console.log(data);
    res.send(data)
})
// 修改产品数据
router.put("/:id", async (req, res) => {
    let id = req.params.id
    console.log(id)
    let data = await client.get("/sup_products/" + id)
    console.log(data)
    let reqdata = req.body
    delete data._id
    data = { ...data, ...reqdata }
    // console.log(data)
    let resdata = await client.put("/sup_products/" + id, { ...data })
    res.send(resdata)
})
router.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await client.delete("/sup_products/" + id))
})
router.put("/updateinfo/:id", async (req, res) => {
    let id = req.params.id
    let data = await client.get("/supplier/" + id)
    let reqdata = req.body
    delete data._id
    let resdata = await client.put("/supplier/" + id, { ...data, ...reqdata })
})
module.exports = router;