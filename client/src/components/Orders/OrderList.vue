<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column label="订单状态" width="80" prop="state">
      <template slot-scope="scope">
        <div v-if="scope.row.state == 0">
          <el-tag>未付款</el-tag>
        </div>
        <div v-else-if="scope.row.state == 1">
          <el-tag type="danger">已付款</el-tag>
        </div>
        <div v-else-if="scope.row.state == 2">
          <el-tag type="warning">待发货</el-tag>
        </div>
        <div v-else-if="scope.row.state == 3">
          <el-tag type="info">已发货</el-tag>
        </div>
        <div v-else-if="scope.row.state == 4">
          <el-tag type="success">已签收</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="订单编号" width="220" prop="_id"></el-table-column>
    <el-table-column label="价格" width="80" prop="price"></el-table-column>
    <el-table-column label="数量" width="80" prop="number"></el-table-column>
    <el-table-column label="购买人" width="80" prop="user"></el-table-column>
    <el-table-column label="联系电话" width="120" prop="phone"></el-table-column>
    <el-table-column label="订单详细" width="100" prop="goods">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <div v-for="(item,index) in scope.row.goods" :key="index">
            <div>
              <p>**商品{{index+1}}**</p>
              <p>名称: {{ item.name }}</p>
              <p>类型: {{ item.type }}</p>
              <p>开始时间: {{ item.startTime }}</p>
              <p>结束时间: {{ item.endTime }}</p>
            </div>
          </div>
          <div slot="reference" class="name-wrapper find">
            <p size="medium">查看</p>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="地址" width="180" prop="addr"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" round size="mini" @click="updateOrder(scope.row._id)">修改</el-button>
        <span v-if="scope.row.state == 2" class="shipBtn">
          <el-button type="danger" round size="mini" @click="shipBtn(scope.row._id)">发货</el-button>
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "orderModules"
);
import axios from "axios";
export default {
  computed: {
    ...mapState(["data", "dialogVisible"])
  },
  created: function() {
    // console.log(this.data);
  },
  methods: {
    ...mapActions(["getOrders", "setOrderInfo"]),
    ...mapMutations(["setUpdateVisible"]),
    updateOrder(id) {
      // console.log(id);
      this.setOrderInfo(id);
      this.setUpdateVisible(true);
    },
    shipBtn(id){
      // console.log(id);
      this.setOrderInfo(id);
      // this.updateInfo.state = 3;
      axios({
        method: "put",
        url: "/orders/" + id,
        data: {
          state: 3,
        }
      }).then(() => {
        this.getOrders();
      })
    }
  }
};
</script>
<style scoped>
.find {
  color: dodgerblue;
}
.shipBtn {
  margin-left: 10px;
}
</style>
