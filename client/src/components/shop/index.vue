<template>
  <div>
    <AddProducts></AddProducts>
    <SearchProducts></SearchProducts>
    <RegShop></RegShop>
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
    RegShop
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