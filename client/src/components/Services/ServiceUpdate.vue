<template>
  <!-- 弹窗 -->
  <el-dialog title="修改" :visible.sync="closeDialogVisible" width="50%" :before-close="handleClose">
    <!-- 内容 -->
    <el-form
      :model="updateInfo"
      status-icon
      :rules="rules"
      ref="updateFrom"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="服务名称" prop="name">
        <el-input v-model="updateInfo.name" placeholder="请输入服务名称"></el-input>
      </el-form-item>
      <el-form-item label="服务类别" prop="type">
        <el-select v-model="updateInfo.type" placeholder="请选择服务类别">
          <el-option label="洗" value="shower"></el-option>
          <el-option label="剪" value="clip"></el-option>
          <el-option label="吹" value="puff"></el-option>
          <el-option label="护理" value="nurse"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务时间" prop="work_time">
        <el-time-select
          placeholder="起始时间"
          v-model="updateInfo.startTime"
          :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
            }"
        ></el-time-select>---
        <el-time-select
          placeholder="结束时间"
          v-model="updateInfo.endTime"
          :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: updateInfo.startTime
            }"
        ></el-time-select>
      </el-form-item>
      <el-form-item label="耗费时间" prop="time">
        <el-input-number v-model="updateInfo.time" :precision="2" :step="0.1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="不可取消">
        <el-switch v-model="updateInfo.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="宠物体重" prop="weight">
        <el-radio-group v-model="updateInfo.weight">
          <el-radio label="20kg以下" name="weight"></el-radio>
          <el-radio label="20-40kg" name="weight"></el-radio>
          <el-radio label="40-50kg" name="weight"></el-radio>
          <el-radio label="50kg及以上" name="weight"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="服务等级" prop="serviceType">
        <el-radio-group v-model="updateInfo.serviceType">
          <el-radio label="精致" name="serviceType"></el-radio>
          <el-radio label="普通" name="serviceType"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="员工等级" prop="stuffLevel">
        <el-radio-group v-model="updateInfo.stuffLevel">
          <el-radio label="S" name="stuffLevel"></el-radio>
          <el-radio label="A" name="stuffLevel"></el-radio>
          <el-radio label="B" name="stuffLevel"></el-radio>
          <el-radio label="C" name="stuffLevel"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="updateInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="text">
        <el-input type="textarea" v-model="updateInfo.text"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancle">取 消</el-button>
      <el-button type="primary" @click="handleSubmit('updateFrom')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "serviceModules"
);
export default {
  data() {
    return {
      rules: {
        name: [{ required: true, message: "服务名称不能为空" }],
        type: [{ required: true, message: "服务类型不能为空" }],
        workTime: [{ required: true, message: "预约时间不能为空" }],
        text: [{ required: true, message: "内容不能为空" }],
        time: [{ required: true, message: "耗费时间不能为空" }],
        price: [{ required: true, message: "价格不能为空" }]
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
    ...mapMutations(["setUpdateVisible", "setServiceInfo"]),
    ...mapActions(["getServices"]),
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleCancle() {
      this.setUpdateVisible(false);
    },
    handleSubmit(updateFrom) {
    //   console.log(this.updateInfo.name)
      this.$refs[updateFrom].validate(valid => {
        if (valid) {
          axios({
            method: "put",
            url: "/services/" + this.updateInfo._id,
            data: {
              name: this.updateInfo.name,
              type: this.updateInfo.type,
              time: this.updateInfo.time,
              delivery: this.updateInfo.delivery,
              weight: this.updateInfo.weight,
              serviceType: this.updateInfo.serviceType,
              stuffLevel: this.updateInfo.stuffLevel,
              price: this.updateInfo.price,
              text: this.updateInfo.text
            }
          }).then(() => {
            this.getServices();
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
