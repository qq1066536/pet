<template>
  <el-container class="container">
    <el-header class="headerBgc">
      <h1>
        爱宠邦后台管理系统
        <span class="el-icon-service user">
          {{phone}},欢迎你：
          <span class="el-icon-error back" @click="removeSession"></span>
        </span>
      </h1>
    </el-header>
    <el-container class="aside">
      <el-aside width="200px" class="aside">
        <el-menu class="menu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
          <el-submenu index="1" v-if="session.private=='管理员'">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>平台管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/manage/platform/UserManage">
                <i class="el-icon-menu"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
              <el-menu-item index="/manage/platform/PetmasterManage">
                <i class="el-icon-printer"></i>
                <span slot="title">宠主管理</span>
              </el-menu-item>
              <el-menu-item index="/manage/platform/StoreManage">
                <i class="el-icon-goods"></i>
                <span slot="title">门店管理</span>
              </el-menu-item>
              <el-menu-item index="/manage/platform/Statistics">
                <i class="el-icon-tickets"></i>
                <span slot="title">统计</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2" v-if="session.private=='门店'">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>门面管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/manage/orders">
                <i class="el-icon-menu"></i>
                <span slot="title">订单</span>
              </el-menu-item>
              <el-menu-item index="/manage/shop">
                <i class="el-icon-printer"></i>
                <span slot="title">商品</span>
              </el-menu-item>
              <el-menu-item index="/manage/services">
                <i class="el-icon-goods"></i>
                <span slot="title">服务</span>
              </el-menu-item>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-tickets"></i>
                  <span>报表展示</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/manage/report/salenum">
                    <i class="el-icon-menu"></i>
                    <span slot="title">销售量统计</span>
                  </el-menu-item>
                  <el-menu-item index="/manage/report/sales">
                    <i class="el-icon-menu"></i>
                    <span slot="title">销售额统计</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3" v-if="session.private=='供应商'">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>供应商管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index>
                <i class="el-icon-menu"></i>
                <span slot="title">供应商信息</span>
              </el-menu-item>
              <el-menu-item index="/manage/supplier/products">
                <i class="el-icon-printer"></i>
                <span slot="title">商品信息</span>
              </el-menu-item>
              <el-menu-item index>
                <i class="el-icon-tickets"></i>
                <span slot="title">统计</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      phone: ""
    };
  },
  computed: {
    path() {
      return this.$router.history.current.path;
    }
  },
  mounted() {
    this.getSessionIndex();
  },
  created() {
    this.getSession();
  },
  computed: {
    ...mapState(["session"])
  },
  methods: {
    ...mapActions(["getSession"]),
    removeSession() {
      this.$confirm("确定退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            method: "get",
            url: "/users/removeSession"
          }).then(() => {
            this.$router.history.push("/login");
            this.$message({
              type: "success",
              message: "退出成功!"
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
    // 判断账号
    getSessionIndex() {
      axios({
        method: "get",
        url: "/users/getSession"
      }).then(({ data }) => {
        if (!data.phone) {
          this.$router.history.push("/login");
        } else if (data.account == "封禁") {
          alert("你的账号已被封禁，如需解封，请及时联系管理员！！！");
          this.$router.history.push("/login");
        } else {
          this.phone = data.phone;
        }
      });
    }
  }
};
</script>

<style scoped>
.headerBgc {
  background-color: #545c64;
  color: #fff;
  height: 84px;
}
.container {
  height: 100%;
}
.menu {
  height: 100%;
}
.user {
  float: right;
  font-size: 16px;
}
.back {
  cursor: pointer;
}
</style>
