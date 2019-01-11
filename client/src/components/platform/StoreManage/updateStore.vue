<template>
    <div>
        <el-dialog title="修改信息" :visible.sync="close" width="50%">
            <el-form :model="store" :rules="rules" status-icon ref="updateShopForm" label-width="150px">
                <el-form-item prop="username" label="用户名：">
                    <el-input v-model="username" type="text" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="店名：">
                    <el-input v-model="name" type="text" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上传门店图片" prop="img_head">
                    <el-upload class="avatar-uploader" action="/upload" :show-file-list="false" :on-success="handleAvatarSuccessShop" :before-upload="beforeAvatarUploadShop">
                        <img v-if="store.img_head" :src="store.img_head" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item prop="business_no" label="营业执照号码：">
                    <el-input v-model="business_no" type="text" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="营业执照图片" prop="business_lic">
                    <el-upload class="avatar-uploader" action="/upload" :show-file-list="false" :on-success="handleAvatarSuccessBus" :before-upload="beforeAvatarUploadBus">
                        <img v-if="store.business_lic" :src="store.business_lic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item prop="legal_person" label="法人：">
                    <el-input v-model="legal_person" type="text" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="营业地址:" prop="addr">
                    <el-input v-model="addr" @blur="getLocation" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="经纬度:">
                    <el-input v-model="location" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="所在城市" prop="city">
                    <el-input v-model="city" type="text" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop="tel">
                    <el-input v-model="tel" type="text" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="特色:" prop="feature">
                    <el-input v-model="feature" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="网址:" prop="website">
                    <el-input v-model="website" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="VIP等级:" prop="vip">
                    <el-input v-model="vip" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="佣金比例:" prop="commission_rate">
                    <el-input v-model="commission_rate" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setUpdateShopVisible(false)">取 消</el-button>
                <el-button type="primary" @click="updateShop">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "platformModule"
);
export default {
  data() {
    return {
      // 验证规则
      rules: {
        id: [{ required: true, message: "请选择注册人", trigger: "blur" }],
        username: [{ required: true, message: "请输入你的名字" }],
        name: [{ required: true, message: "请输入你的店名" }],
        business_no: [{ required: true, message: "营业执照编号不能为空" }],
        addr: [
          { required: true, message: "营业地址不能为空", trigger: "blur" }
        ],
        city: [{ required: true, message: "所在城市不能为空" }],
        legal_person: [{ required: true, message: "法人姓名不能为空" }],
        feature: [{ required: true, message: "请填写门店特色" }],
        website: [{ required: true, message: "请填写门店特色" }],
        vip: [{ required: true, message: "请输入vip等级" }],
        commission_rate: [{ required: true, message: "佣金比例不能为空" }],
        tel: [
          { required: true, message: "联系电话不能为空" },
          {
            pattern: /^[1]{1}[3,5,7,8,9]{1}[0-9]{9}$/,
            message: "请输入正确的手机号"
          }
        ],
        business_lic: [
          { required: true, message: "请上传营业执照", trigger: "blur" }
        ],
        img_head: [
          { required: true, message: "请上传门店图片", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState(["store", "updateShopVisible"]),
    //从仓库修改值
    //弹出框
    close: {
      get() {
        return this.updateShopVisible;
      },
      set() {
        this.setUpdateShopVisible(false);
      }
    },
    username: {
      get() {
        return this.store.username;
      },
      set(username) {
        this.$store.commit("platformModule/setStore", {
          ...this.store,
          username
        });
      }
    },
    name: {
      get() {
        return this.store.name;
      },
      set(name) {
        this.$store.commit("platformModule/setStore", { ...this.store, name });
      }
    },
    business_no: {
      get() {
        return this.store.business_no;
      },
      set(business_no) {
        this.$store.commit("platformModule/setStore", {
          ...this.store,
          business_no
        });
      }
    },
    legal_person: {
      get() {
        return this.store.legal_person;
      },
      set(legal_person) {
        this.$store.commit("platformModule/setStore", {
          ...this.store,
          legal_person
        });
      }
    },
    addr: {
      get() {
        return this.store.addr;
      },
      set(addr) {
        this.$store.commit("platformModule/setStore", { ...this.store, addr });
      }
    },
    location: {
      get() {
        return this.store.location;
      },
      set(location) {
        this.$store.commit("platformModule/setStore", {
          ...this.store,
          location
        });
      }
    },
    city: {
      get() {
        return this.store.city;
      },
      set(city) {
        this.$store.commit("platformModule/setStore", { ...this.store, city });
      }
    },
    tel: {
      get() {
        return this.store.tel;
      },
      set(tel) {
        this.$store.commit("platformModule/setStore", { ...this.store, tel });
      }
    },
    feature: {
      get() {
        return this.store.feature;
      },
      set(feature) {
        this.$store.commit("platformModule/setStore", {
          ...this.store,
          feature
        });
      }
    },
    website: {
      get() {
        return this.store.website;
      },
      set(website) {
        this.$store.commit("platformModule/setStore", {
          ...this.store,
          website
        });
      }
    },
    vip: {
      get() {
        return this.store.vip;
      },
      set(vip) {
        this.$store.commit("platformModule/setStore", { ...this.store, vip });
      }
    },
    commission_rate: {
      get() {
        return this.store.commission_rate;
      },
      set(commission_rate) {
        this.$store.commit("platformModule/setStore", {
          ...this.store,
          commission_rate
        });
      }
    }
  },
  methods: {
    ...mapActions(["setStores"]),
    ...mapMutations(["setUpdateShopVisible"]),
    //获取当前位置的经纬度
    getLocation() {
      axios({
        method: "get",
        url: "/platform/addr",
        params: {
          addr: this.store.addr
        }
      }).then(({ data }) => {
        let lng = `${data.result.location.lng}`;
        let lat = `${data.result.location.lat}`;
        this.store.location = lng + "," + lat;
      });
    },
    //上传图片
    //门店图片
    handleAvatarSuccessShop(res, file) {
      this.store.img_head = "/upload/" + res;
    },
    beforeAvatarUploadShop(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return isLt2M;
      }
    },
    //营业执照图片
    handleAvatarSuccessBus(res, file) {
      this.store.business_lic = "/upload/" + res;
    },
    beforeAvatarUploadBus(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return isLt2M;
      }
    },
    //修改门面信息提交按钮
    updateShop() {
      this.$refs.updateShopForm.validate(valid => {
        let {
          _id,
          username,
          name,
          img_head,
          business_no,
          business_lic,
          legal_person,
          addr,
          location,
          city,
          tel,
          feature,
          website,
          vip,
          commission_rate
        } = this.store;
        if (valid) {
          axios({
            method: "put",
            url: "/platform/putShop/" + _id,
            data: {
              username,
              name,
              img_head,
              business_no,
              business_lic,
              legal_person,
              addr,
              location,
              city,
              tel,
              feature,
              website,
              vip,
              commission_rate
            }
          }).then(({}) => {
            this.setStores();
            this.setUpdateShopVisible(false);
          });
        } else {
          this.$alert("输入信息有误，或不完整！！", "消息");
        }
      });
    }
  }
};
</script>
<style>
</style>
