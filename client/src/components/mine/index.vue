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
const { mapActions } = createNamespacedHelpers("shopModule");
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
    ...mapActions(["getSession"])
  },
  created() {
   this.getSession()
    // console.log(123);
  }
};
</script>

<style>

</style>
