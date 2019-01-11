<template>
  <div>
    <AddProducts></AddProducts>
    <AddSuplierPro></AddSuplierPro>
      <RegShop></RegShop>
      <ChekShop></ChekShop>
    <SearchProducts></SearchProducts>
    <UpdateProducts></UpdateProducts>
    <ProductsList></ProductsList>
    <PageProducts></PageProducts>
    <el-submenu>
      <template slot="title">
        <i class="el-icon-tickets"></i>
        <span>报表展示</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/manage/shop/salenum">
          <i class="el-icon-menu"></i>
          <span slot="title">销售量统计</span>
        </el-menu-item>
        <el-menu-item index="/manage/shop/sales">
          <i class="el-icon-menu"></i>
          <span slot="title">销售额统计</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <router-view></router-view>
  </div>
</template>

<script>
import ProductsList from "./productsList";
import AddProducts from "./AddProducts";
import UpdateProducts from "./UpdateProducts";
import SearchProducts from "./SearchProducts";
import PageProducts from "./PageProducts";
import AddSuplierPro from "./AddSuplierPro";
import RegShop from "./regShop";
import ChekShop from "./chekShop";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("productsMoudles");
export default {
  components: {
    ProductsList,
    AddProducts,
    UpdateProducts,
    SearchProducts,
    PageProducts,
    RegShop,
    AddSuplierPro,
    ChekShop
  },
  data() {
    return {
      products: [],
      pagination: {},
      type: "",
      value: ""
    };
  },
  methods: {
    ...mapActions(["setProducts"])
  },
  created() {
    this.setProducts();
    // console.log(123);
  }
};
</script>

<style scoped>
.headerBgc {
  background-color: skyblue;
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
</style>
