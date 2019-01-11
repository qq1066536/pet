<template>
  <div>
        <el-table-column width="120" prop="location" label="定位"></el-table-column>
        <el-table-column width="120" prop="legal_person" label="法人"></el-table-column>
        <el-table-column width="120" prop="tel" label="联系电话"></el-table-column>
        <el-table-column width="120" prop="feature" label="特色"></el-table-column>
        <el-table-column width="120" prop="vip" label="VIP等级"></el-table-column>
        <el-table-column width="120" prop="package" label="佣金比例"></el-table-column>
        <el-table-column width="120" prop="stuff[0].name" label="店员"></el-table-column>
        <el-table-column width="150" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="showById(scope.row._id)">修改</el-button>
            <el-button size="small" type="danger" @click="del( scope.row._id)">停用</el-button>
          </template>
        </el-table-column>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("platformModule");
export default {
  computed: {
    ...mapState(["stores"])
  },
  data() {
    return {
      addDialogVisible: false
    };
  },
  created() {
    this.setStores();
  },
  methods: {
    ...mapActions(["setStores"]),
    //打开增加门店面板
    openAddDialog() {
      this.addDialogVisible = true;
    },
    //关闭增加门店面板
    calcle() {
      this.addDialogVisible = false;
    }
  }
};
</script>
<style>
</style>
