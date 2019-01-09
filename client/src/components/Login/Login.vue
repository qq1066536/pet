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
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
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





</script>