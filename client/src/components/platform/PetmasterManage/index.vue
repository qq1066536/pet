<template>
  <div>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <div class="el-search">
      <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
        <el-select class="selectWidth" v-model="type" slot="prepend" placeholder="请选择">
          <el-option label="账户名" value="name"></el-option>
          <el-option label="地址" value="addr"></el-option>
          <el-option label="账户状态" value="account"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
      </el-input>
    </div>
    <div>
      <el-table :data="petmasters" style="width: 100%" ref="filterTable">
        <el-table-column prop="name" label="账户名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="addr" label="地址"></el-table-column>
        <el-table-column prop="account" label="账户状态" :filters="[{ text: '正常', value: '正常' }, { text: '封禁', value: '封禁' }]" :filter-method="filterAccount" filter-placement="bottom-end"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="Unsealing( scope.row)">解封</el-button>
            <el-button size="small" type="danger" @click="Prohibition( scope.row)">封禁</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="petmasterPagination.curpage" :page-sizes="[5, 10, 20, 30]" :page-size="petmasterPagination.eachpage" layout="total, sizes, prev, pager, next, jumper" :total="petmasterPagination.total"></el-pagination>
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
    ...mapState(["petmasters", "petmasterPagination","petmasterSearch"])
  },
  data() {
    return {
      //搜索
      value: "",
      type: "",
      currentSize: ""
    };
  },
  created() {
    this.setPetmasters();
  },
  methods: {
    ...mapActions(["setPetmasters"]),
    ...mapMutations(["setPetmasterSearch"]),
    //解封账号
    Unsealing(data) {
      let id = data._id;
      if (data.account == "正常") {
        return;
      } else {
        this.$confirm("此操作将同意此账号的解封, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            axios({
              method: "put",
              url: "/platform/putPetmaster/" + id,
              data: {
                account: "正常"
              }
            }).then(({ data }) => {
              this.setPetmasters();
              this.$message({
                type: "success",
                message: "已解封!"
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
    //封禁账号
    Prohibition(data) {
      let id = data._id;
      if (data.account == "封禁") {
        return;
      } else {
        this.$confirm("此操作将同意此账号封禁, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            axios({
              method: "put",
              url: "/platform/putPetmaster/" + id,
              data: {
                account: "封禁"
              }
            }).then(({ data }) => {
              this.setPetmasters();
              this.$message({
                type: "success",
                message: "已封禁!"
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
    //清除所有过滤器
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    //筛选账户状态
    filterAccount(value, row) {
      return row.account === value;
    },
    //分页
    handleSizeChange(size) {
      this.setPetmasters({
        page: 1,
        rows: size,
        type: this.petmasterSearch.type,
        value: this.petmasterSearch.value
      });
      this.currentSize = size;
    },
    handleCurrentChange(page) {
      this.setPetmasters({
        page,
        rows: this.currentSize,
        type: this.petmasterSearch.type,
        value: this.petmasterSearch.value
      });
    },
    // 搜索
    searchBtn() {
      let { type, value } = this;
      this.setPetmasterSearch({ type, value });
      this.setPetmasters({ page: 1, rows: 5, type, value });
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
