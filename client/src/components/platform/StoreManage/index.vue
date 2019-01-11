<template>
  <div>
    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="openAddDialog">添加门店</el-button>
    <div>
      <el-dialog title="添加门店" :visible.sync="addDialogVisible" width="30%">
        <span slot="footer" class="dialog-footer">
          <el-button @click="calcle">取 消</el-button>
          <el-button type="primary" @click="addStore">确 定</el-button>
        </span>
      </el-dialog>

      <el-table :data="stores" style="width: 100%" max-height="180">
        <el-table-column width="120" prop="name" label="门店名"></el-table-column>
        <el-table-column width="120" prop="addr" label="营业地址"></el-table-column>
        <el-table-column width="120" prop="No" label="营业执照号码"></el-table-column>
        <el-table-column width="120" prop="business_lic" label="营业执照图片"></el-table-column>
        <el-table-column width="120" prop="city" label="所在城市"></el-table-column>
        <el-table-column width="120" prop="location" label="定位"></el-table-column>
        <el-table-column width="120" prop="legal_person" label="法人"></el-table-column>
        <el-table-column width="120" prop="tel" label="联系电话"></el-table-column>
        <el-table-column width="120" prop="img_head" label="头图"></el-table-column>
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
      </el-table>
    </div>
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
