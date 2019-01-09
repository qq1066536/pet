<template>
  <producerList :producers="producers" :show="show"></producerList>
</template>
<script>
import ProducerList from "./producerList";
import axios from "axios";
export default {
  components: {
    ProducerList
  },
  data() {
    return {
      producers: [],
      producer: {}
    };
  },
  created() {
    this.show();
  },
  computed: {
    id: function() {
      return "5c32ef8a6c9da2c6832b81fe";
    }
  },
  methods: {
    show() {
      axios({
        method: "get",
        url: "/supplier",
        params: {
          id: this.id,
          page:1,
          rows:3
        }
      }).then(({ data }) => {
        this.producers = data
      });
    }
  }
};
</script>
<style>
</style>
