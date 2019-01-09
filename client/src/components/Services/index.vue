<template>
  <div>
    <ServiceAdd></ServiceAdd>
    <ServiceUpdate></ServiceUpdate>
    <ServiceList></ServiceList>
  </div>
</template>

<script>
import ServiceList from "./ServiceList";
import ServiceUpdate from "./ServiceUpdate";
import ServiceAdd from "./ServiceAdd";
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('serviceModules')
export default {
  components: {
    ServiceAdd,
    ServiceList,
    ServiceUpdate,
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
