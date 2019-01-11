<template>
  <div>
    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="openAddDialog">添加门店</el-button>
    <div>
      <el-dialog title="添加门店" :visible.sync="addDialogVisible" width="50%">
        <el-form :model="addShopForm" :rules="rules" status-icon ref="addShopForm" label-width="150px">
          <el-form-item label="选择门店注册人：" prop="id">
            <el-select v-model="addShopForm.id" placeholder="请选择门店注册人">
              <el-option v-for="item in regShoper" :key="item" :label="item.phone" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="username" label="用户名：">
            <el-input v-model="addShopForm.username" type="text" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="店名：">
            <el-input v-model="addShopForm.name" type="text" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上传门店图片" prop="img_head">
            <el-upload class="avatar-uploader" action="/upload" :show-file-list="false" :on-success="handleAvatarSuccessShop" :before-upload="beforeAvatarUploadShop">
              <img v-if="addShopForm.img_head" :src="addShopForm.img_head" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item prop="business_no" label="营业执照号码：">
            <el-input v-model="addShopForm.business_no" type="text" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="营业执照图片" prop="business_lic">
            <el-upload class="avatar-uploader" action="/upload" :show-file-list="false" :on-success="handleAvatarSuccessBus" :before-upload="beforeAvatarUploadBus">
              <img v-if="addShopForm.business_lic" :src="addShopForm.business_lic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item prop="legal_person" label="法人：">
            <el-input v-model="addShopForm.legal_person" type="text" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="营业地址:" prop="addr">
            <el-input v-model="addShopForm.addr" @blur="getLocation" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="经纬度:">
            <el-input v-model="addShopForm.location" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="所在城市" prop="city">
            <el-input v-model="addShopForm.city" type="text" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="tel">
            <el-input v-model="addShopForm.tel" type="text" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="特色:" prop="feature">
            <el-input v-model="addShopForm.feature" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="网址:" prop="website">
            <el-input v-model="addShopForm.website" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="VIP等级:" prop="vip">
            <el-input v-model="addShopForm.vip" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="佣金比例:" prop="commission_rate">
            <el-input v-model="addShopForm.commission_rate" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="calcle">取 消</el-button>
          <el-button type="primary" @click="addStore">确 定</el-button>
        </span>
      </el-dialog>
      <UptateStore></UptateStore>
      <el-table :data="stores" style="width: 100%" max-height="180">
        <el-table-column width="120" prop="username" label="注册人"></el-table-column>
        <el-table-column width="120" prop="name" label="门店名"></el-table-column>
        <el-table-column width="120" prop="addr" label="营业地址" show-overflow-tooltip="false"></el-table-column>
        <el-table-column width="120" prop="business_no" label="营业执照号码" show-overflow-tooltip="false"></el-table-column>
        <el-table-column width="120" prop="business_lic" label="营业执照图片" show-overflow-tooltip="false"></el-table-column>
        <el-table-column width="120" prop="city" label="所在城市" show-overflow-tooltip="false"></el-table-column>
        <el-table-column width="120" prop="location" label="定位" show-overflow-tooltip="false"></el-table-column>
        <el-table-column width="120" prop="legal_person" label="法人"></el-table-column>
        <el-table-column width="120" prop="tel" label="联系电话"></el-table-column>
        <el-table-column width="120" prop="img_head" label="头图" show-overflow-tooltip="false"></el-table-column>
        <el-table-column width="120" prop="feature" label="特色" show-overflow-tooltip="false"></el-table-column>
        <el-table-column width="120" prop="website" label="网址" show-overflow-tooltip="false"></el-table-column>
        <el-table-column width="120" prop="vip" label="VIP等级"></el-table-column>
        <el-table-column width="120" prop="commission_rate" label="佣金比例"></el-table-column>
        <el-table-column width="120" prop="status" label="审核状态"></el-table-column>
        <el-table-column width="120" prop="account" label="门店状态"></el-table-column>
        <el-table-column width="250" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="updateShop(scope.row._id)">
              <i class="el-icon-edit"></i>修改</el-button>
            <el-button size="small" type="success" @click="unsealingShop(scope.row)">
              <i class="el-icon-check"></i>解封</el-button>
            <el-button size="small" type="danger" @click="prohibitionShop(scope.row)">
              <i class="el-icon-close"></i>封禁</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import UptateStore from "./updateStore.vue";
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "platformModule"
);
export default {
  components: {
    UptateStore
  },
  computed: {
    ...mapState(["stores"])
  },
  data() {
    return {
      addDialogVisible: false,
      //初始每次点击增加门店获取的未和shop关联的门店注册人
      regShoper: [],
      //初始化添加表单
      addShopForm: {
        id: "",
        username: "",
        name: "",
        img_head: "",
        business_no: "",
        business_lic: "",
        legal_person: "",
        addr: "",
        location: "",
        city: "",
        tel: "",
        feature: "",
        website: "",
        vip: "",
        commission_rate: ""
      },
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
  created() {
    this.setStores();
  },
  methods: {
    ...mapActions(["setStores","setStore"]),
    ...mapMutations(["setUpdateShopVisible"]),
    //打开增加门店面板
    openAddDialog() {
      this.addDialogVisible = true;
      this.findUserForShop();
    },
    // 解封shop按钮
    unsealingShop(data) {
      let id = data._id;
      if (data.account == "关闭") {
        this.$confirm("此操作将同意此门店的解封, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            axios({
              method: "put",
              url: "/platform/putShop/" + id,
              data: { account: "正常" }
            }).then(({}) => {
              this.setStores();
              this.$message({
                type: "success",
                message: "门店解封成功!"
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      } else {
        return;
      }
    },
    //封禁按钮
    prohibitionShop(data) {
      let id = data._id;
      if (data.account == "关闭") {
        return;
      } else {
        this.$confirm("此操作将把此门店进行封禁, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            axios({
              method: "put",
              url: "/platform/putShop/" + id,
              data: { account: "关闭" }
            }).then(({ data }) => {
              this.setStores();
              this.$message({
                type: "success",
                message: "门店封禁成功!"
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      }
    },
    //添加确定按钮
    addStore() {},
    //关闭增加门店面板
    calcle() {
      this.addDialogVisible = false;
    },
    //查询user集合里没有关联shop集合的门店
    findUserForShop() {
      axios({
        method: "get",
        url: "/platform/findUserForShop"
      }).then(({ data }) => {
        this.regShoper = data;
      });
    },
    //获取当前位置的经纬度
    getLocation() {
      axios({
        method: "get",
        url: "/platform/addr",
        params: {
          addr: this.addShopForm.addr
        }
      }).then(({ data }) => {
        let lng = `${data.result.location.lng}`;
        let lat = `${data.result.location.lat}`;
        this.addShopForm.location = lng + "," + lat;
      });
    },
    //上传图片
    //门店图片
    handleAvatarSuccessShop(res, file) {
      this.addShopForm.img_head = "/upload/" + res;
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
      this.addShopForm.business_lic = "/upload/" + res;
    },
    beforeAvatarUploadBus(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return isLt2M;
      }
    },
    //点击确定添加门店
    addStore() {
      this.$refs.addShopForm.validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/platform/addShop",
            data: {
              id: this.addShopForm.id,
              username: this.addShopForm.username,
              name: this.addShopForm.name,
              img_head: this.addShopForm.img_head,
              business_no: this.addShopForm.business_no,
              business_lic: this.addShopForm.business_lic,
              legal_person: this.addShopForm.legal_person,
              addr: this.addShopForm.addr,
              location: this.addShopForm.location,
              city: this.addShopForm.city,
              tel: this.addShopForm.tel,
              feature: this.addShopForm.feature,
              website: this.addShopForm.website,
              vip: this.addShopForm.vip,
              commission_rate: this.addShopForm.commission_rate,
              status: "待审核",
              account: "正常"
            }
          }).then(({}) => {
            this.setStores();
            this.addDialogVisible = false;
          });
        } else {
          this.$alert("输入信息有误，或不完整！！", "消息");
        }
      });
    },
    //修改门店信息
    updateShop(id) {
      this.setStore(id);
      this.setUpdateShopVisible(true);
    }
  }
};
</script>
<style scoped>
.avatar-uploader,
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  width: 300px;
  position: relative;
  overflow: hidden;
  text-align: center;
}
.avatar-uploader,
.el-upload:hover {
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
</style>
