<template>
  <el-card class="box-card">
     <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
    <el-form :model="lgForm" status-icon :rules="rules" ref="lgForm" label-width="100px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="lgForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="lgForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(lgForm)">登录</el-button>
        <a class="toReg">
          <router-link to="register">没有账号，请注册</router-link>
        </a>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      lgForm: {
        phone: "",
        pwd: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号码" },
          { pattern: /^1\d{10}$/, message: "手机号码格式不正确" }
        ],
        pwd: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.lgForm.validate(valid => {
        if (valid) {
          console.log(this.lgForm.pwd, this.lgForm.phone)
          axios({
            method: "post",
            url: "/users/login",
            data: {
              phone: this.lgForm.phone,
              pwd: this.lgForm.pwd
            }
          }).then(({ data }) => {
            console.log(data)
            if(data.status == 0){
              this.$router.push("manage");
            }else{
              this.$alert("登录失败，账号或密码错误！！", "消息");
            }
          });
        } else {
          this.$alert("登录失败，输入有误！！", "消息");
        }
      });
    }
  }
};
</script>
<style scoped>
.box-card {
  width: 500px;
  margin: 300px auto;
}

.clearfix span {
  font-size: 30px;
}
.toReg{
  float: right;
  text-decoration: none;
  
}
</style> 
