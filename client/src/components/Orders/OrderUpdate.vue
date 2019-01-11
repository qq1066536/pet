
/* eslint-disable */
<template>
  <el-dialog title="修改" :visible.sync="closeDialogVisible" width="30%" :before-close="handleClose">
    <!-- 表单内容 -->
    <el-form
      :model="updateInfo"
      status-icon
      :rules="rules"
      ref="updateFrom"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名" prop="user">
        <el-input type="text" v-model="updateInfo.user" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="收件地址" prop="addr">
        <el-input type="text" v-model="updateInfo.addr" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model.number="updateInfo.phone"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancle">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('updateFrom')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from "axios"
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("orderModules");
export default {
  data() {
    return {
      rules: {
        user: [{ required: true, message: "姓名不能为空" }],
        addr: [{ required: true, message: "地址不能为空" }],
        phone: [{ required: true, message: "电话不能为空" }]
      }
    };
  },
  computed: {
    ...mapState(["updateInfo", "dialogVisible"]),
    closeDialogVisible: {
      get() {
        return this.dialogVisible;
      },
      set() {
        this.setUpdateVisible(false);
      }
    }
  },
  methods: {
    ...mapMutations(["setUpdateVisible", "setOrderInfo"]),
    ...mapActions(["getOrders"]),

    handleCancle() {
      this.setUpdateVisible(false);
    },
    handleSubmit(updateFrom) {
        // console.log(this.updateInfo.user)
      this.$refs[updateFrom].validate(valid => {
        if (valid) {
          axios({
            method: "put",
            url: "/orders/" + this.updateInfo._id,
            data: {
              user: this.updateInfo.user,
              addr: this.updateInfo.addr,
              phone: this.updateInfo.phone
            }
          }).then(() => {
            this.getOrders();
            this.setUpdateVisible(false);
          });
        } else {
          alert("请填写完整信息");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
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
</style>
