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
export default {
  components: {
    OrderList,
    OrderPage,
    OrderUpdate,
    OrderSearch
  },
  data() {},
  created: function() {
    this.getOrder();
  }
};
</script>

<style>
</style>
