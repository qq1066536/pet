<template>
  <div>
    <AddProducts></AddProducts>
    <AddSuplierPro></AddSuplierPro>
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
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("productsMoudles");
export default {
  components: {
    ProductsList,
    AddProducts,
    UpdateProducts,
    SearchProducts,
    PageProducts,
    AddSuplierPro,
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
    ...mapActions(["setProducts","getSession"])
  },
  created() {
    this.setProducts();
    this.getSession()
    // console.log(123);
  }
};
</script>

<style>

</style>
