<template>
  <div>
    <el-table :data="products" style="width: 100%;textalign:center;height:80">
      <el-table-column prop="name" label="品牌" width=100></el-table-column>
      <el-table-column prop="type" label="品类"></el-table-column>
      <el-table-column prop="makings" label="材质" width=160></el-table-column>
      <el-table-column prop="spec" label="使用规格" width=120></el-table-column>
      <el-table-column prop="suit" label="专属规格"></el-table-column>
      <el-table-column prop="weight" label="包装规格" width=160></el-table-column>
      <el-table-column prop="taste" label="口味"></el-table-column>
      <el-table-column prop="effect" label="特殊功用" width=120></el-table-column>
      <el-table-column prop="addr" label="产地"></el-table-column>
      <el-table-column prop="pro_date" label="生产日期" width=120></el-table-column>
      <el-table-column prop="valid_date" label="保质期"></el-table-column>
      <el-table-column prop="No" label="供应商编号" width=120></el-table-column>
      <el-table-column prop="desc" label="特色说明"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <!-- <el-table-column prop="img" label="图片" width=120></el-table-column> -->
       <el-table-column prop="number" label="数量" width=120></el-table-column>
      <el-table-column label="操作" width=200>
        <template slot-scope="scope">
          <el-button size="mini" @click="showById(scope.row._id)">查看/编辑</el-button>
          <el-button size="mini" type="danger" @click="delProducts(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import axios from "axios"
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "productsMoudles"
);
export default {
  props: [],
  computed: {
    ...mapState(["products"])
  },
  methods: {
      ...mapMutations(["setupdateVisible"]),
      ...mapActions(["setProducts","setProduct"]),
    delProducts(id) {
      console.log(id)
      axios({
        method: "delete",
        url: "/sopPropducts/" + id
      }).then(() => {
        // this.show();
          this.setProducts();
      });
    },
        showById(id){
         this.setupdateVisible(true)
         this.setProduct(id);
    }
  }
};
</script>

<style>
</style>