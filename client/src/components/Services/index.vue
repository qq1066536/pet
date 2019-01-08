<template>
  <div>
    <ServiceUpdate></ServiceUpdate>
    <ServiceList></ServiceList>
  </div>
</template>

<script>
import ServiceList from "./ServiceList";
import ServiceUpdate from "./ServiceUpdate";
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('serviceModules')
export default {
  components: {
    ServiceUpdate,
    ServiceList,
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
