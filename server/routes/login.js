var express = require('express');
var router = express.Router();
var client=require('ykt-http-client');
client.url('127.0.0.1:8080')

// 登陆
router.post('/login',async function(req,res){
    let { username, password } = req.body;
    let data=await client.get('/regsite',{ username, password,findType: "exact" })
    if(data.length>0){
      res.send({
        status:1
      })
    }else{
      res.send({
        status:0
      })
    }
  })
  


module.exports = router;
