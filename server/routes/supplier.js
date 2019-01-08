var express = require('express');
var router = express.Router();
const client=require("ykt-http-client");
client.url("http://127.0.0.1:8080")
router.get("/", async (req,res)=>{
    let {id,page,rows}=req.query
    console.log(id,page,rows)
    let data=await client.get(`/supplier/${id}`,{submitType:"findJoin",ref:"products"})
    console.log(data)
    res.send()
})
router.post("/",async (req,res)=>{

})
router.put("/:id",(req,res)=>{

})
router.delete("/:id",(req,res)=>{

})

module.exports = router;