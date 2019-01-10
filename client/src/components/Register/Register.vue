<template>
  <el-card class="box-card">
    <div slot="header" class="clearx">
      <span>注册</span>
    </div>
    <el-form :model="regForm" status-icon :rules="rules" ref="regForm" label-width="100px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="regForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="regForm.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confrim">
        <el-input type="password" v-model="regForm.confrim"></el-input>
      </el-form-item>
      <el-form-item label="类型：" class="regadministrators" prop="private">
        <el-radio label="门店" v-model="regForm.private" border>门店</el-radio>
        <el-radio label="供应商" v-model="regForm.private" border>供应商</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(regForm)">注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      regForm: {
        private: "",
        phone: "",
        pwd: "",
        confirm: ""
      },
      //验证规则
      rules: {
        private: [{ required: true, message: "请选择注册类型" }],
        phone: [
          { required: true, message: "请输入电话号码" },
          {
            pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
            message: "手机号格式不正确"
          },
          { validator: this.validatePhone }
        ],
        pwd: [
          { required: true, message: "请输入密码" },
          { pattern: /^\d{6,20}$/, message: "密码至少6位最多20位" }
        ],
        confrim: [
          { required: true, message: "确认密码" },
          { validator: this.validatePwd }
        ]
      }
    };
  },
  methods: {
    validatePhone(rule, value, callback) {     
      axios(
        {
          method: "get",
          url: "/users",

          params: {
            phone: value
          }
        }).then(({ data }) => {
          if (data.status == 0) {
            callback(new Error("手机号重复"));
          } else {
            callback();
          }
        })
      ;
    },
    validatePwd(rule, value, callback) {
      if (value == this.regForm.pwd) {
        callback();
      } else {
        callback(new Error("两次密码不一致，请重新输入"));
      }
    },
    regadministrators() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/uesrs",
            data: {
              phone: this.regFrom.phone,
              pwd: this.regForm.pwd,
              private: this.regForm.ptivate,
              status: "未审核"
            }
          }).then(({ data }) => {
            this.resetForm();
          });
        } else {
          this.$alert("注册失败，请重新注册");
        }
      });  
    },
      submitForm() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/users",
            data: {
              phone: this.regForm.phone,
              pwd: this.regForm.pwd
            }
          }).then(() => {
            this.$router.push("login");
          });
        } else {
          this.$alert("注册失败，输入有误！！", "消息");
        }
      });
    },
  }
};
</script>

<style scoped>
.box-card {
  width: 500px;
  margin: 0 auto;
  margin-top: 300px;
}
.clearx span {
  font-size: 30px;
}
</style>
