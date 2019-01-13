<template>
  <span class="left">
    <el-button type @click="dialogVisible = true">门店详情</el-button>
    <el-dialog title="门店详情" :visible.sync="dialogVisible" width="40%">
      <el-card class="box-card">
        <div>
          <p>名称：{{this.shop.name}}</p>
          <p>营业地址：{{this.shop.addr}}</p>
          <p>营业执照号码：{{this.shop.business_no}}</p>
          <p>城市：{{this.shop.city}}</p>
          <p>法人:{{this.shop.legal_person}}</p>
          <p>联系电话：{{this.shop.tel}}</p>
          <p>特色：{{this.shop.feature}}</p>
          <p>佣金比例：{{this.shop.commission_rate}}</p>
          <p>申请状态:{{this.shop.status}}</p>
          <p>营业情况：{{this.shop.account}}</p>
        </div>
      </el-card>
    </el-dialog>
  </span>
</template>
<script>
import { createNamespacedHelpers} from "vuex";
import axios from "axios";
const { mapActions, mapState,mapMutations } = createNamespacedHelpers("shopModule");
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState(["shopId", "shop"])
  },
  methods: {
    ...mapMutations(["setShop"]),
    ...mapActions(["getSession"])
  },
  created() {
    this.getSession();
  }
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.left {
  margin-left: 20px;
}
.box-card {
  width: 90%;
}
</style>


