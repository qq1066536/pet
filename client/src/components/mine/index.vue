<template>
  <div>
    <RegShop></RegShop>
    <ChekShop></ChekShop>
  </div>
</template>
<script>
import RegShop from "./regShop";
import ChekShop from "./chekShop";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("productsMoudles");
export default {
  components: {
    RegShop,
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

<style>

</style>
