<template>
  <div>
    <el-table :data="products" style="width: 100%">
      <el-table-column prop="name" label="品牌"></el-table-column>
      <el-table-column prop="type" label="品类"></el-table-column>
      <el-table-column prop="makings" label="材质"></el-table-column>
      <el-table-column prop="spec" label="使用规格"></el-table-column>
      <el-table-column prop="suit" label="专属规格"></el-table-column>
      <el-table-column prop="weight" label="包装规格"></el-table-column>
      <el-table-column prop="taste" label="口味"></el-table-column>
      <el-table-column prop="effect" label="特殊功用"></el-table-column>
      <el-table-column prop="addr" label="产地"></el-table-column>
      <el-table-column prop="pro_date" label="生产日期"></el-table-column>
      <el-table-column prop="valid_date" label="保质期"></el-table-column>
      <el-table-column prop="No" label="供应商编号"></el-table-column>
      <el-table-column prop="desc" label="特色说明"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="">
          <el-button size="mini">修改</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("");
export default {
  props: [],
    computed: {
    ...mapState(["products"])
  },
  methods: {
    ...mapMutations(["setProducts"]),
    ...mapActions()
  }
};
</script>

<style>
</style>