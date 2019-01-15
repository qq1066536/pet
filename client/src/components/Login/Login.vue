<template>
<div class="box">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>欢迎登录爱宠邦后台管理系统</span>
    </div>
    <el-form :model="lgForm" status-icon :rules="rules" ref="lgForm" label-width="100px">
      <el-form-item label="账号" prop="phone">
        <el-input v-model="lgForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="lgForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="lg()">登录</el-button>
        <a class="toReg">
          <router-link to="register">没有账号，请注册</router-link>
        </a>
      </el-form-item>
    </el-form>
  </el-card>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      lgForm: {
        phone: "",
        pwd: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号码" }
          // { pattern: /^1\d{10}$/, message: "手机号码格式不正确" }
        ],
        pwd: [{ required: true, message: "请输入密码" }]
      }
    };
  },

  methods: {
    ...mapActions(["getSession"]),
    lg() {
      this.$refs.lgForm.validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/users/login",
            data: {
              phone: this.lgForm.phone,
              password: this.lgForm.pwd
            }
          }).then(({ data }) => {
            if (data.status == 0) {
              this.$router.push("manage");
              // this.setSession();
            } else {
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
.box {
  width: 100%;
  height: 78%;
  padding-top: 10%;
  background: url("../../assets/1.jpg") no-repeat;
  background-size: cover;
}
.box-card {
  width: 500px;
  margin: 0 auto 0 25%;
}
.position {
  /* padding-top: 30px; */
}
.clearfix span {
  font-size: 30px;
}
.toReg {
  float: right;
  text-decoration: none;
}
</style> 
