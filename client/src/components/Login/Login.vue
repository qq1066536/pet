<template>
     <el-card class="box-card">
    <el-form :model="lgForm" status-icon :rules="rules" ref="lgForm" label-width="100px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="lgForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="lgForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
        <a class="gotoreg"><router-link to="register">没有账号，请注册</router-link></a>
      </el-form-item>
</template>
<script>
import axios from"axios"
export default{
    data(){
        return{
            lgForm:{
                phone:"",
                pwd:"",
                confirm:""
            },
            rules:{
                phone:[
                    {required:true,message:"请输入电话号码"},
                    {pattern:/^1\d{10}$/,message:"手机号输入有误"},
                    {validator:this.validtePhone},
                ]
            },pwd:[
                {required:true,message:"请输入密码"},
                {pattern:/^\d{6,20}$/,message:"密码错误"}
                ]
        }
    }
}
//验证方法
  methods:{
    validatePhone(rule, value, callback){
      axios:({
        method:"get",
        url:"/users",
        params:{
          phone:value,
        }
      }).then(({data})=>{
        if(data.status==0){
          callback("手机号重复");
        }else{
          callback();
        }

      });
       methods:{
    validatePwd(rule, value, callback){
      axios:({
        method:"get",
        url:"/users",
        params:{
          pwd:value,
        }
      }).then(({data})=>{
        if(data.status==0){
          callback("密码错误");
        }else{
          callback();
        }

      });

      }
      validatePwd(rule,value,callback){
        if(value ==this.regForm.pwd)
      }
      
    }
  }
}




</script>