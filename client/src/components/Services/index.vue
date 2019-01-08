<template>
  <div>
    <OrderUpdate></OrderUpdate>
    <OrderList></OrderList>
  </div>
</template>

<script>
import ServiceList from "./ServiceList";
import ServiceUpdate from "./ServiceUpdate";
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('serviceModules')
export default {
  components: {
    OrderList,
    OrderUpdate,
  },
  created: function() {
    this.getServices();
  },
  methods: {
    ...mapActions(["getServices"])
  }
};
</script>

<style>
</style>
