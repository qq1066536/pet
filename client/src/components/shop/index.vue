<template>
  <div>
  <ProductsList></ProductsList>
  </div>
</template>

<script>
import ProductsList from "./productsList";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("productsMoudles");
export default {
  components: {
    ProductsList,
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
  }
};
</script>

<style>
</style>