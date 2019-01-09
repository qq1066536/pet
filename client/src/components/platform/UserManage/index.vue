<template>
    <div>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">添加</el-button>
        <el-dialog title="添加" :visible.sync="dialogVisible" width="30%">
            <el-form :model="addForm" status-icon :rules="rules" ref="addForm" label-width="100px">
                <el-form-item label="类型：" prop="private">
                    <el-radio label="门店" v-model="addForm.private" border>门店</el-radio>
                    <el-radio label="供应商" v-model="addForm.private" border>供应商</el-radio>
                </el-form-item>
                <el-form-item label="手机号：" prop="phone">
                    <el-input type="text" v-model="addForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="addForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="confirm">
                    <el-input type="password" v-model="addForm.confirm" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="calcel">取 消</el-button>
                <el-button type="primary" @click="addAdministrators">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="详情" :visible.sync="dialogDetailsVisible" width="30%">

        </el-dialog>
        <div>
            <el-table :data="storesAndsuppliers" style="width: 100%">
                <el-table-column prop="username" label="账户名"></el-table-column>
                <el-table-column prop="user.private" label="申请类型"></el-table-column>
                <el-table-column prop="user.status" label="状态"></el-table-column>
                <el-table-column label="申请信息">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="see(scope.row._id)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showById(scope.row._id)">同意</el-button>
                        <el-button size="small" type="danger" @click="del( scope.row._id)">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("platformModule");
export default {
  computed: {
    ...mapState(["storesAndsuppliers"])
  },
  created() {
    this.setStoresAndSuppliers();
  },
  data() {
    return {
      //初始数据为空
      addForm: {
        private: "",
        phone: "",
        password: "",
        confirm: ""
      },
      //验证规则
      rules: {
        private: [{ required: true, message: "请选择注册类型" }],
        phone: [
          { required: true, message: "请输入电话号码" },
          { pattern: /^1\d{10}$/, message: "手机号码格式不正确" },
          { validator: this.validatePhone }
        ],
        password: [
          { required: true, message: "请输入密码" },
          { min: 6, message: "密码最少六位" }
        ],
        confirm: [
          { required: true, message: "请输入确认密码" },
          { validator: this.validatePwd }
        ]
      },
      dialogVisible: false,
      dialogDetailsVisible: false
    };
  },
  methods: {
    ...mapActions(["setStoresAndSuppliers"]),
    //   验证手机号是否重复
    validatePhone(rule, value, callback) {
      axios({
        method: "get",
        url: "/platform/findPhone",
        params: {
          phone: value
        }
      }).then(({ data }) => {
        if (data.status == 0) {
          callback("手机号重复");
        } else {
          callback();
        }
      });
    },
    validatePwd(rule, value, callback) {
      if (value == this.addForm.password) {
        callback();
      } else {
        callback("两次密码不一致");
      }
    },
    //查看门店或供应商申请信息
    see(id) {
      this.dialogDetailsVisible = true;
    },
    // 添加门店管理员或供应商管理员
    addAdministrators() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          axios({
            method: "post",
            url: "/platform/reg",
            data: {
              phone: this.addForm.phone,
              password: this.addForm.password,
              private: this.addForm.private,
              status: "待审核"
            }
          }).then(({ data }) => {
            this.dialogVisible = false;
            this.resetForm();
          });
        } else {
          this.$alert("注册失败，输入有误！！", "消息");
        }
      });
    },
    calcel() {
      this.dialogVisible = false;
      this.resetForm();
    },
    //重置表单
    resetForm() {
      this.$refs.addForm.resetFields();
    }
  }
};
</script>
<style scoped>
.select {
  width: 175px;
}
.selectP {
  text-align: center;
}
</style>
