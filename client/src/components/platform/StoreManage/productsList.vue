<template>
  <div>
    
  </div>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState,mapMutations } = createNamespacedHelpers("");
export default {
  props: [],
  computed: {
    ...mapState()
  },
  methods: {

      ...mapMutations(),
    ...mapActions(),
  }
};
</script>

<style>
</style>