<template>
  <div>
    <el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true">增加</el-button>
    <!-- 弹窗 -->
    <el-dialog title="增加" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <!-- 内容 -->
      <el-form
        :model="addForm"
        status-icon
        :rules="rules"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="服务名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入服务名称"></el-input>
        </el-form-item>
        <el-form-item label="服务类别" prop="type">
          <el-select v-model="addForm.type" placeholder="请选择服务类别">
<<<<<<< HEAD
            <el-option label="洗护" value="护理" name="type"></el-option>
=======
            <el-option label="洗护" value="洗护" name="type"></el-option>
>>>>>>> 482c2cbad1a6b188daceb1638938c32a72f77400
            <el-option label="寄养" value="寄养" name="type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务时间" prop="day">
          <el-date-picker
            prop="day"
            v-model="addForm.startTime"
            type="datetime"
            placeholder="选择开始日期时间"
          ></el-date-picker>
          <el-date-picker
            prop="day"
            v-model="addForm.endTime"
            type="datetime"
            placeholder="选择结束日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="耗费时间" prop="time">
          <el-input-number v-model="addForm.time" :precision="2" :step="0.1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="不可取消">
          <el-switch v-model="addForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="宠物体重" prop="weight">
          <el-radio-group v-model="addForm.weight">
            <el-radio label="20kg以下" name="weight"></el-radio>
            <el-radio label="20-40kg" name="weight"></el-radio>
            <el-radio label="40-50kg" name="weight"></el-radio>
            <el-radio label="50kg及以上" name="weight"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="服务等级" prop="serviceType">
          <el-radio-group v-model="addForm.serviceType">
            <el-radio label="精致" name="serviceType"></el-radio>
            <el-radio label="普通" name="serviceType"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="员工等级" prop="stuffLevel">
          <el-radio-group v-model="addForm.stuffLevel">
            <el-radio label="S" name="stuffLevel"></el-radio>
            <el-radio label="A" name="stuffLevel"></el-radio>
            <el-radio label="B" name="stuffLevel"></el-radio>
            <el-radio label="C" name="stuffLevel"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="text">
          <el-input type="textarea" v-model="addForm.text"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleBtn">取 消</el-button>
        <el-button type="primary" @click="addBtn('addForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("serviceModules");
export default {
  data() {
    return {
      day: "",
      dialogVisible: false,
      addForm: {
        name: "",
        type: "",
        startTime: "",
        endTime: "",
        time: "",
        delivery: "",
        weight: [],
        serviceType: "",
        stuffLevel: "",
        price: "",
        text: ""
      },
      rules: {
        name: [{ required: true, message: "服务名称不能为空" }],
        type: [{ required: true, message: "服务类型不能为空" }],
        startTime: [{ required: true, message: "开始时间不能为空" }],
        endTime: [{ required: true, message: "结束时间不能为空" }],
        text: [{ required: true, message: "内容不能为空" }],
        time: [{ required: true, message: "耗费时间不能为空" }],
        price: [{ required: true, message: "价格不能为空" }]
      }
    };
  },
  computed: {
    ...mapState(["shopId"])
  },
  methods: {
    ...mapActions(["getServices"]),
    // ...mapMutations(["setStuInfo"]),
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
          this.$refs.addForm.resetFields();
        })
        .catch(() => {});
    },
    cancleBtn: function() {
      this.dialogVisible = false;
      this.$refs.addForm.resetFields();
    },
    addBtn(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/services",
            data: {
              name: this.addForm.name,
              type: this.addForm.type,
              startTime: this.addForm.startTime,
              endTime: this.addForm.endTime,
              time: this.addForm.time,
              delivery: this.addForm.delivery,
              weight: this.addForm.weight,
              serviceType: this.addForm.serviceType,
              stuffLevel: this.addForm.stuffLevel,
              price: this.addForm.price,
              text: this.addForm.text,
              id: this.shopId
            }
          }).then(() => {
            this.dialogVisible = false;
            this.$refs.addForm.resetFields();
            this.getServices();
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

<style>
</style>
