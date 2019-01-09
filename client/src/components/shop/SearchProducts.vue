<template>
  <div style="margin-top: 15px;">
    <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
      <el-select v-model="name" slot="prepend" placeholder="请选择" class="select">
        <el-option label="品牌" value="name"></el-option>
        <el-option label="品类" value="type"></el-option>
        <el-option label="特殊功用" value="effect"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapMutations } = createNamespacedHelpers("productsMoudles");
export default {
  data() {
    return {
     
    };
  },
  methods: {
    ...mapMutations(["setSearch"]),
    // change(e) {
    //   this.setName(e.target.value);
    // },
    //  input(e) {
    //   this.setValue(e.target.value);
    // },
    ...mapActions(["setStudents"]),

    search() {
      console.log(this);
 
      // this.$emit("show", 1,5, this.name, this.value);
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
