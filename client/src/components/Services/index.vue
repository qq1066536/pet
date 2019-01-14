<template>
  <div>
    <div class="order-head">
      <ServiceAdd class="order-add"></ServiceAdd>
      <ServiceSearch></ServiceSearch>
    </div>
    <ServiceUpdate></ServiceUpdate>
    <ServiceList></ServiceList>
    <ServicePage></ServicePage>
  </div>
</template>

<script>
import ServiceList from "./ServiceList";
import ServiceUpdate from "./ServiceUpdate";
import ServiceAdd from "./ServiceAdd";
import ServicePage from "./ServicePage";
import ServiceSearch from "./ServiceSearch";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("serviceModules");
export default {
  components: {
    ServiceAdd,
    ServiceList,
    ServiceUpdate,
    ServicePage,
    ServiceSearch
  },
  created: function() {
    this.getServices();
  },
  methods: {
    ...mapActions(["getServices"])
  }
};
</script>

<style scoped>
.order-head {
  display: flex;
  align-items: flex-end;
}
.order-add {
  margin-right: 10px;
}
</style>
