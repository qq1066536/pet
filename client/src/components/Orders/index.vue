<template>
  <div>
    <OrderUpdate></OrderUpdate>
    <OrderSearch></OrderSearch>
    <OrderList></OrderList>
    <OrderPage></OrderPage>
  </div>
</template>

<script>
import OrderList from "./OrderList";
import OrderPage from "./OrderPage";
import OrderUpdate from "./OrderUpdate";
import OrderSearch from "./OrderSearch";
import { createNamespacedHelpers } from 'vuex'
const { mmapState,mapActions } = createNamespacedHelpers('orderModules')
export default {
  components: {
    OrderList,
    OrderPage,
    OrderUpdate,
    OrderSearch
  },
  data() {
    return {

    }
  },
  created: function() {
    this.getOrders();
  },
  methods: {
    ...mapActions(["getOrders"])
  }
};
</script>

<style>
</style>
