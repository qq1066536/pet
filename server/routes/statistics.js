var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url("http://127.0.0.1:8080")

router.get("/", async (req, res) => {
    let { id, page, rows } = req.query
    let data = await client.get('/supplier', { submitType: "findJoin", ref: "user", "user.$id": id })
    res.send(data)
})
module.exports = router;