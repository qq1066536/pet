var express = require('express');
var router = express.Router();
var client=require('ykt-http-client');
client.url('127.0.0.1:8080')

// 注册
router.post('/', async function(req,res){
    let {username,password}=req.query;
        await client.post('/users',{username,password})
        res.send({ status: 1 });
    })


module.exports = router;