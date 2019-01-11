<template>
  <div>
    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">添加</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <div class="el-search">
      <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
        <el-select class="selectWidth" v-model="type" slot="prepend" placeholder="请选择">
          <el-option label="手机号" value="phone"></el-option>
          <el-option label="申请类型" value="private"></el-option>
          <el-option label="状态" value="status"></el-option>
          <el-option label="账号情况" value="account"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
      </el-input>
    </div>
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
    <el-dialog title="修改信息" :visible.sync="updateDialogVisible" width="30%">
      <el-form :model="user" status-icon ref="updateForm" :rules="rules" label-width="100px">
        <el-form-item label="密码：" prop="password">
          <el-input v-model="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateCalcel">取 消</el-button>
        <el-button type="primary" @click="updateAdministrators">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="dialogDetailsVisible" width="30%">
      <div v-if="userPrivate == '门店'">
        <p v-if="shopOrsupplier.status == '已审核'">
          <el-button type="success">已审核</el-button>
        </p>
        <p v-if="shopOrsupplier.status == '已拒绝'">
          <el-button type="info">已拒绝</el-button>
        </p>
        <p>注册人：{{shopOrsupplier.username}}</p>
        <p>营业地址：{{shopOrsupplier.addr}}</p>
        <p>门店标号：{{shopOrsupplier.No}}</p>
        <p>网址：{{shopOrsupplier.website}}</p>
        <p>营业执照图片：{{shopOrsupplier.business_lic}}</p>
        <p>店名：{{shopOrsupplier.desc}}</p>
        <p>营业执照号码：{{shopOrsupplier.business_no}}</p>
        <p>所在城市：{{shopOrsupplier.city}}</p>
        <p>法人：{{shopOrsupplier.legal_person}}</p>
        <p>联系电话：{{shopOrsupplier.tel}}</p>
        <p>头图：{{shopOrsupplier.img_head}}</p>
        <p>特色：{{shopOrsupplier.feature}}</p>
        <p>VIP等级：{{shopOrsupplier.vip}}</p>
        <p>佣金比例：{{shopOrsupplier.package}}</p>
        <p v-if="shopOrsupplier.status == '待审核'">
          <el-button type="primary" @click="agreeShopTwice(shopOrsupplier._id)">通过审核</el-button>
          <el-button type="danger" @click="refuseShopTwice(shopOrsupplier._id)">拒绝</el-button>
        </p>
      </div>
      <div v-if="userPrivate == '供应商'">
        <p v-if="shopOrsupplier.status == '已审核'">
          <el-button type="success">已审核</el-button>
        </p>
        <p v-if="shopOrsupplier.status == '已拒绝'">
          <el-button type="info">已拒绝</el-button>
        </p>
        <p>供应商名字：{{shopOrsupplier.username}}</p>
        <p>供应商编号：{{shopOrsupplier.No}}</p>
        <p>供应商名称：{{shopOrsupplier.name}}</p>
        <p>供应商地址：{{shopOrsupplier.addr}}</p>
        <p>供应商电话：{{shopOrsupplier.tel}}</p>
        <p>供应商网站：{{shopOrsupplier.website}}</p>
        <p>供应商营业执照：{{shopOrsupplier.business_lic}}</p>
        <p>供应商备注：{{shopOrsupplier.desc}}</p>
        <p v-if="shopOrsupplier.status == '待审核'">
          <el-button type="primary" @click="agreeSupplierTwice(shopOrsupplier._id)">通过审核</el-button>
          <el-button type="danger" @click="refuseSupplierTwice(shopOrsupplier._id)">拒绝</el-button>
        </p>
      </div>
    </el-dialog>
    <div>
      <el-table :data="users" style="width: 100%" ref="filterTable">
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="private" label="申请类型" :filters="[{ text: '供应商', value: '供应商' }, { text: '门店', value: '门店' }]" :filter-method="filterPrivate" filter-placement="bottom-end"></el-table-column>
        <el-table-column prop="status" label="用户状态" :filters="[{ text: '已审核', value: '已审核' }, { text: '待审核', value: '待审核' }, { text: '已拒绝', value: '已拒绝' }]" :filter-method="filterStatus" filter-placement="bottom-end"></el-table-column>
        <el-table-column prop="account" label="账号情况" :filters="[{ text: '正常', value: '正常' }, { text: '封禁', value: '封禁' }]" :filter-method="filterAccount" filter-placement="bottom-end"></el-table-column>
        <el-table-column label="申请信息">
          <template slot-scope="scope">
            <el-button size="mini" @click="see(scope.row._id)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="" width="400" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="agree(scope.row)">
              <i class="el-icon-check"></i>同意</el-button>
            <el-button size="small" type="warning" @click="refuse(scope.row)">
              <i class="el-icon-minus"></i>拒绝</el-button>
            <el-button size="small" type="danger" @click="prohibition(scope.row)">
              <i class="el-icon-close"></i>封禁</el-button>
            <el-button size="small" type="info" @click="unsealing(scope.row)">
              <i class="el-icon-view"></i>解封</el-button>
            <el-button size="small" type="primary" @click="revise(scope.row._id)">
              <i class="el-icon-edit"></i>修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.curpage" :page-sizes="[5, 10, 20, 30]" :page-size="pagination.eachpage" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
  </div>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "platformModule"
);
export default {
  computed: {
    ...mapState(["users", "user", "pagination", "search"]),
    password: {
      get() {
        return this.user.password;
      },
      set(password) {
        this.$store.commit("platformModule/setUser", {
          ...this.user,
          password
        });
      }
    }
  },
  created() {
    this.setUsers();
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
      shopOrsupplier: {},
      userPrivate: "",
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
      dialogDetailsVisible: false,
      updateDialogVisible: false,
      //分页
      currentSize: "",
      //搜索
      value: "",
      type: ""
    };
  },
  methods: {
    ...mapActions(["setUsers", "setUser"]),
    ...mapMutations(["setSearch"]),
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
      axios({
        method: "get",
        url: "/platform/findShopOrSupplier",
        params: {
          id
        }
      }).then(({ data }) => {
        // console.log("data", data.length);
        // console.log("private", data[0].user.private);
        if (data.length == 0) {
          this.shopOrsupplier = {};
          this.userPrivate = "";
        } else {
          this.dialogDetailsVisible = true;
          this.shopOrsupplier = data[0];
          this.userPrivate = data[0].user.private;
        }
      });
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
              status: "待审核",
              account: "正常"
            }
          }).then(({ data }) => {
            this.dialogVisible = false;
            this.resetForm();
            this.setUsers();
          });
        } else {
          this.$alert("注册失败，输入有误！！", "消息");
        }
      });
    },
    //关闭添加弹出框
    calcel() {
      this.dialogVisible = false;
      this.resetForm();
    },
    //关闭修改弹出框
    updateCalcel() {
      this.updateDialogVisible = false;
    },
    //清除所有过滤器
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    //筛选申请类型
    filterPrivate(value, row) {
      return row.private === value;
    },
    //筛选状态
    filterStatus(value, row) {
      return row.status === value;
    },
    //筛选账号情况
    filterAccount(value, row) {
      return row.account === value;
    },
    //重置表单
    resetForm() {
      this.$refs.addForm.resetFields();
    },
    //同意申请按钮
    agree(data) {
      let id = data._id;
      if (data.status != "待审核") {
        return;
      } else {
        this.$confirm("此操作将同意此账号的审核, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            axios({
              method: "put",
              url: "/platform/putStatus/" + id,
              data: {
                status: "已审核"
              }
            }).then(({ data }) => {
              this.setUsers();
              this.$message({
                type: "success",
                message: "已同意审核!"
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
    //拒绝按钮
    refuse(data) {
      let id = data._id;
      if (data.status != "待审核") {
        return;
      } else {
        this.$confirm("此操作将拒绝此账号的审核, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            axios({
              method: "put",
              url: "/platform/putStatus/" + id,
              data: {
                status: "已拒绝"
              }
            }).then(({ data }) => {
              this.setUsers();
              this.$message({
                type: "success",
                message: "已拒绝审核!"
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
    //封禁按钮
    prohibition(data) {
      let id = data._id;
      if (data.account != "正常") {
        return;
      } else {
        this.$confirm("此操作将封禁此账号, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            axios({
              method: "put",
              url: "/platform/putStatus/" + id,
              data: {
                account: "封禁"
              }
            }).then(({ data }) => {
              this.setUsers();
              this.$message({
                type: "success",
                message: "封禁成功!"
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
    //解封按钮
    unsealing(data) {
      let id = data._id;
      if (data.account != "封禁") {
        return;
      } else {
        this.$confirm("此操作将解封此账号, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            axios({
              method: "put",
              url: "/platform/putStatus/" + id,
              data: {
                account: "正常"
              }
            }).then(({ data }) => {
              this.setUsers();
              this.$message({
                type: "success",
                message: "解封成功!"
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
    //修改按钮
    revise(id) {
      this.updateDialogVisible = true;
      this.setUser(id);
    },
    //修改提交
    updateAdministrators() {
      let { _id, password } = this.user;
      this.$refs.updateForm.validate(valid => {
        if (valid) {
          axios({
            method: "put",
            url: "/platform/putStatus/" + _id,
            data: {
              password
            }
          }).then(({ data }) => {
            this.updateDialogVisible = false;
            this.setUsers();
          });
        } else {
          this.$alert("修改失败，输入有误！！", "消息");
        }
      });
    },
    //通过门店开店申请
    agreeShopTwice(id) {
      this.$confirm("此操作将通过次账号的门店申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "put",
            url: "/platform/putShop/" + id,
            data: { status: "已审核" }
          }).then(({ data }) => {
            this.dialogDetailsVisible = false;
            this.$message({
              type: "success",
              message: "门店审核成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    //拒绝门店的申请
    refuseShopTwice(id) {
      this.$confirm("此操作将拒绝次账号的门店申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "put",
            url: "/platform/putShop/" + id,
            data: { status: "已拒绝" }
          }).then(({ data }) => {
            this.dialogDetailsVisible = false;
            this.$message({
              type: "success",
              message: "已拒绝此门店申请!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    //通过供应商的开店申请
    agreeSupplierTwice(id) {
      this.$confirm("此操作将通过次账号的供应商申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "put",
            url: "/platform/putSupplier/" + id,
            data: { status: "已审核" }
          }).then(({ data }) => {
            this.dialogDetailsVisible = false;
            this.$message({
              type: "success",
              message: "供应商审核成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    //拒绝供应商的开店申请
    refuseSupplierTwice(id) {
      this.$confirm("此操作将拒绝次账号的供应商申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "put",
            url: "/platform/putSupplier/" + id,
            data: { status: "已拒绝" }
          }).then(({ data }) => {
            this.dialogDetailsVisible = false;
            this.$message({
              type: "success",
              message: "已拒绝此供应商申请!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    //分页
    handleSizeChange(size) {
      this.setUsers({
        page: 1,
        rows: size,
        type: this.search.type,
        value: this.search.value
      });
      this.currentSize = size;
    },
    handleCurrentChange(page) {
      //   console.log(`当前页: ${val}`);
      this.setUsers({
        page,
        rows: this.currentSize,
        type: this.search.type,
        value: this.search.value
      });
    },
    //搜索
    searchBtn() {
      let { type, value } = this;
      this.setSearch({ type, value });
      this.setUsers({ page: 1, rows: 5, type, value });
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
.el-select .el-input {
  width: 100px;
}
.selectWidth {
  width: 120px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-search {
  margin-top: 15px;
  width: 500px;
}
</style>
