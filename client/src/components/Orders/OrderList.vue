<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column label="订单编号" width="280" prop="_id"></el-table-column>
    <el-table-column label="价格" width="100" prop="price"></el-table-column>
    <el-table-column label="数量" width="90" prop="number"></el-table-column>
    <el-table-column label="购买人" width="100" prop="user"></el-table-column>
    <el-table-column label="联系电话" width="180" prop="phone"></el-table-column>
    <el-table-column label="地址" width="180" prop="addr"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="updateOrder(scope.row._id)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "orderModules"
);
export default {
  computed: {
    ...mapState(["data", "dialogVisible"])
  },
  created: function() {
    // console.log(this.data);
  },
  methods: {
    ...mapActions(["getOrders","setOrderInfo"]),
    ...mapMutations(["setUpdateVisible"]),
    updateOrder(id) {
      // console.log(id);
      this.setOrderInfo(id);
      this.setUpdateVisible(true);
    },
  }
};
</script>
