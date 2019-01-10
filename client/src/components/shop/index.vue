<template>
  <div>
    <AddProducts></AddProducts>
    <AddSuplierPro></AddSuplierPro>
      <RegShop></RegShop>
    <SearchProducts></SearchProducts>
    <UpdateProducts></UpdateProducts>
    <ProductsList></ProductsList>
    <PageProducts></PageProducts>
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
    AddSuplierPro
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

<style>
</style>