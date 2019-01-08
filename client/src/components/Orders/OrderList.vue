<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column label="订单编号" width="180" prop="shop._id"></el-table-column>
    <el-table-column label="订单名称" width="180" prop=""></el-table-column>
    <el-table-column label="价格" width="100"></el-table-column>
    <el-table-column label="数量" width="90"></el-table-column>
    <el-table-column label="购买人" width="100"></el-table-column>
    <el-table-column label="联系电话" width="100"></el-table-column>
    <el-table-column label="地址" width="180"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("orderModules");
export default {
  computed: {
    ...mapState(["data"])
  },
  created: function() {
    console.log(this.data);
  },
  methods: {
    ...mapActions(["getOrders"])

    // handleEdit(index, row) {
    //   console.log(index, row);
    // },
    // handleDelete(index, row) {
    //   console.log(index, row);
    // }
  }
};
</script>
