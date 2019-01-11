var express = require('express');
var router = express.Router();
var Axios = require("axios")
/* GET home page. */
router.get('/', async (req, res) => {
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

module.exports = router;