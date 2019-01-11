<template>
  <span>
    <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
      <el-select v-model="type" slot="prepend" placeholder="请选择" class="select">
        <el-option label="品牌" value="name"></el-option>
        <el-option label="品类" value="type"></el-option>
        <el-option label="特殊功用" value="effect"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
  </span>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapMutations, mapState } = createNamespacedHelpers(
  "productsMoudles"
);
export default {
  data() {
    return {
      type: "",
      value: ""
    };
  },
  computed: {
    ...mapState(["id"])
  },
  methods: {
    ...mapMutations(["setSearch"]),
    ...mapActions(["setProducts"]),

    search() {
    //   console.log(this);
      this.setProducts({
        page: 1,
        rows: 5,
        type: this.type,
        value: this.value,
        id:this.id
      });
      this.setSearch({
        type: this.type,
        value: this.value,
         id:this.id
      });
    }
  }
};
</script>

<style scoped>
.input-with-select {
  width: 500px;
}
.select {
  width: 100px;
}
</style>
