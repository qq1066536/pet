<template>
  <span class="regCard">
    <el-button type="primary" @click="dialogVisible = true">注册门店</el-button>
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
          <el-input type="text" v-model="regForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号码:" prop="business_no">
          <el-input v-model="regForm.business_no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="营业执照图片"  prop="business_lic">
          <el-upload
            class="avatar-uploader"
            action="/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="regForm.business_lic" :src="regForm.business_lic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="营业地址:" prop="addr">
          <el-input v-model="regForm.addr" @blur="getLocation"></el-input>
        </el-form-item>
        <el-form-item label="经纬度:" prop="location">
          <el-input v-model="regForm.location" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="所在城市:" prop="city">
          <el-input v-model="regForm.city"></el-input>
        </el-form-item>-->
        <el-form-item label="所在城市" prop="city">
          <!-- <el-input v-model="addForm.city" clearable :disabled></el-input> -->
          <el-cascader expand-trigger="hover" :options="citys" v-model="regForm.city"></el-cascader>
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
        <el-form-item
          v-for="(item, index) in regForm.stuff"
          :label="'店员' + (index+1)"
          :key="index"
          :prop="'stuff.' + index"
        >
          <el-input v-model="item.name" placeholder="店员姓名"></el-input>
          <el-input v-model="item.title" placeholder="店员职位"></el-input>
          <el-input v-model="item.phone" placeholder="联系电话"></el-input>
          <el-button @click.prevent="removeItem(item)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addItem">添加店员</el-button>
        </el-form-item>
        <el-form-item label="门店头像">
          <el-upload
            class="avatar-uploader"
            action="/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1"
          >
            <img v-if="regForm.img_head" :src="regForm.img_head" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="regBtn('regForm')">确定</el-button>
          <el-button>重置</el-button>
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
      account:"正常",
      regForm: {
        name: "",
        business_no: "",
        addr: "",
        city: [],
        legal_person: "",
        tel: "",
        feature: "",
        vip: "",
        commission_rate: "",
        stuff: [],
        business_lic: "",
        img_head: "",
        location:""
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
        // stuff: [
        //   { required: true, message: "店员信息不能为空", trigger: "blur" }
        // ],
        tel: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          {
            pattern: /^[1]{1}[3,5,7,8,9]{1}[0-9]{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        business_lic: [
          { required: true, message: "请上传营业执照", trigger: "blur" }
        ]
      },
      citys: [
        {
          value: "四川省",
          label: "四川省",
          children: [
            {
              value: "成都",
              label: "成都"
            },
            {
              value: "德阳",
              label: "德阳"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState(["userId"])
  },
  methods: {
    getLocation(){
      axios({
        method: "get",
        url: "/shop/addr",
        params:{
          addr:this.regForm.addr
        }
      }).then(({data})=>{
        let lng=`${data.result.location.lng}`
        let lat=`${data.result.location.lat}`
        // this.location=data.result.location
        this.regForm.location=lng+","+lat
        // console.log(this.regForm.location)
        // console.log(typeof data.result)
        // console.log("定位",data.result.location)
      })
    },
    removeItem(item) {
      var index = this.regForm.stuff.indexOf(item);
      if (index !== -1) {
        this.regForm.stuff.splice(index, 1);
      }
    },
    addItem() {
      this.regForm.stuff.push({
        name: "",
        phone: "",
        title: ""
      });
    },
    handleAvatarSuccess(res) {
      this.regForm.business_lic="/upload/" + res;
      // console.log(res, file);
    },
    handleAvatarSuccess1(res) {
       this.regForm.img_head="/upload/" + res;
      // console.log(res, file);
    },
    ...mapActions(["getSession"]),
    regBtn() {
      // console.log("userId", this.userId);
      let {
        name,
        business_no,
        addr,
        city,
        legal_person,
        tel,
        feature,
        vip,
        commission_rate,
        stuff,
        business_lic,
        img_head,
        location
      } = this.regForm;
      axios({
        method: "post",
        url: "/shop",
        data: {
          name: name,
          business_no: business_no,
          addr: addr,
          location: JSON.stringify(location),
          city: JSON.stringify(city),
          legal_person: legal_person,
          tel: tel,
          feature: feature,
          vip: vip,
          commission_rate: commission_rate,
          stuff: JSON.stringify(stuff),
          business_lic,
          img_head,
          userId: this.userId,
          status: "待审核",
          account:this.account,
        }
      }).then(() => {
        // this.$emit("show")
        this.dialogVisible = false;
        // this.$refs.regForm.resetFileds();
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
.regCard {
  margin-left: 20px;
}
</style>
