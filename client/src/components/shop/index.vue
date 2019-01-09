<template>
  <div>
    <AddProducts></AddProducts>
    <SearchProducts></SearchProducts>
    <UpdateProducts></UpdateProducts>
    <ProductsList></ProductsList>
  </div>
</template>
<script>
import ProductsList from "./productsList";
import AddProducts from "./AddProducts";
import UpdateProducts from "./UpdateProducts";
import SearchProducts from "./SearchProducts";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("productsMoudles");
export default {
  components: {
    ProductsList,
    AddProducts,
    UpdateProducts,
    SearchProducts
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
    console.log(123);
  }
};
</script>

<style>
</style>