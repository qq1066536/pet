<template>
  <span class="regCard">
    <el-button type="primary" @click="dialogVisible = true">完善门店信息</el-button>
    <el-dialog title="门店信息" :visible.sync="dialogVisible" width="50%">
      <el-form
        :model="regForm"
        status-icon
        :rules="rules"
        ref="regForm"
        label-width="130px"
        class="demo-regForm"
      >
        <el-form-item label="名称:" prop="name">
          <el-input type="text" v-model="regForm.name" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="营业执照号码:" prop="business_no">
          <el-input v-model="regForm.business_no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="营业地址:" prop="addr">
          <el-input v-model="regForm.addr"></el-input>
        </el-form-item>
        <el-form-item label="定位:" prop="location">
          <el-input v-model="regForm.location"></el-input>
        </el-form-item>
        <el-form-item label="所在城市:" prop="city">
          <el-input v-model="regForm.city"></el-input>
        </el-form-item>
        <el-form-item label="法人:" prop="legal_person">
          <el-input v-model="regForm.legal_person"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:" prop="tel">
          <el-input v-model="regForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="特色:" prop="feature">
          <el-input v-model="regForm.feature"></el-input>
        </el-form-item>
        <el-form-item label="VIP等级:" prop="vip">
          <el-input v-model="regForm.vip"></el-input>
        </el-form-item>
        <el-form-item label="佣金比例:" prop="commission_rate">
          <el-input v-model="regForm.commission_rate"></el-input>
        </el-form-item>
        <el-form-item label="店员:" prop="stuff">
          <el-input v-model="regForm.stuff"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="regBtn('regForm')">确定</el-button>
          <el-button @click="resetForm('regForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </span>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("shopModule");
export default {
  data() {
    return {
      regForm: {
        name: "",
        business_no: "",
        addr: "",
        location: "",
        city: "",
        legal_person: "",
        tel:"",
        feature: "",
        vip: "",
        commission_rate: "",
        stuff: "",
        business_lic: "",
        img_head: ""
      },
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: "门店名称不能为空", trigger: "blur" },
     
          { validator: this.validatephone, trigger: "blur" }
        ],
        business_no: [
          { required: true, message: "营业执照编号不能为空", trigger: "blur" }
        ],
        addr: [
          { required: true, message: "营业地址不能为空", trigger: "blur" }
        ],
        location: [
          { required: true, message: "经纬度不能为空", trigger: "blur" }
        ],
        city: [
          { required: true, message: "所在城市不能为空", trigger: "blur" }
        ],
        legal_person: [
          { required: true, message: "法人姓名不能为空", trigger: "blur" }
        ],
        feature: [
          { required: true, message: "请填写门店特色", trigger: "blur" }
        ],
        vip: [{ required: true, message: "请输入vip等级", trigger: "blur" }],
        commission_rate: [
          { required: true, message: "佣金比例不能为空", trigger: "blur" }
        ],
        stuff: [
          { required: true, message: "店员信息不能为空", trigger: "blur" }
        ],
         tel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
               {
            pattern: /^[1]{1}[3,5,7,8,9]{1}[0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          },
        ],
      }
    };
  },
  computed: {
    ...mapState(["id"])
  },
  methods: {
    ...mapActions([""]),
    regBtn(regForm) {
      console.log("提交成功");
      console.log("id", this.id);
      let {
        name,
        business_no,
        addr,
        location,
        city,
        legal_person,
        tel,
        feature,
        vip,
        packcommission_ratea,
        stuff,
        business_lic,
        img_head
      } = this.regForm;
        axios({
        method: "post",
        url: "/shop",
        data: {
        name:name,
        business_no:business_no,
        addr:addr,
        location:JSON.stringify(location),
        city:city,
        legal_person:legal_person,
        tel:tel,
        feature:feature,
        vip:vip,
        packcommission_ratea:packcommission_ratea,
        stuff:JSON.stringify(stuff),
        business_lic,
        img_head,
        userId:this.id,
        status:0
        }
      }).then(() => {
        // this.$emit("show")
        this.dialogVisible = false;
        this.regForm.reset();
      });
    }
  }
};
</script>
<style scoped>
.box-card {
  width: 700px;
  margin: auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.regCard{
    margin-left:500px;
}
</style>
