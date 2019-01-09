<template>
  <el-card class="box-card">
    <el-form :model="regForm" status-icon :rules="rules" ref="regForm" label-width="100px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="regForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="regForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confrim">
        <el-input type="password" v-model.number="regForm.confrim"></el-input>
      </el-form-item>
      <el-radio v-model="radio" label="门店">门店</el-radio>
      <el-radio v-model="radio" label="供货商">供货商</el-radio>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import axios from"axios"
export default {
  data() {
    return {
      regForm: {
        phone: "",
        pwd: "",
        confirm: ""
      },
      rules: {
        phone:[
          {required:true,message:"请输入电话号码"},
          {pattern:/^1\d{10}$/,message:"手机号格式不正确"},
          {validator:this.validatePhone},
          ]
      }, pwd:[
          {required:true,message:"请输入密码"},
          {pattern:/^\d{6,20}$/,message:"密码格式不正确"},
          {validator:this.validatePwd}
          ],
          confrim:[
      {validator:this.validatePwd},{}
      ]
      
    } 
    

  },
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

<style scoped>
.box-card {
  width: 500px;
  margin: auto;
}
</style>
