<template>
  <span>
     <el-button type="danger" @click="dialogVisible = true">添加供应商商品</el-button>
      <el-dialog title="供应商商品" :visible.sync="dialogVisible" width="100%">
    <el-table :data="supProducts" style="width: 100%;textalign:center;height:80">
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
       <el-table-column prop="inventory" label="数量" width=120></el-table-column>
      <el-table-column label="操作" width=200>
        <template slot-scope="scope">
          <el-button size="middle" @click="postSupPro(scope.row._id)" >添加该商品</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-button @click="dialogVisible = false">取 消</el-button>
    </el-dialog>
  </span>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import axios from "axios"
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "productsMoudles"
);
export default {
  data() {
      return {
        dialogVisible: false,
        number:1
      };
    },
  props: [],
  computed: {
    ...mapState(["supProducts","id"])
  },
  methods: {
        handleChange(value) {
        console.log(value);
      },
      ...mapActions(["setSupProducts","setProducts",]),
      postSupPro(id){
      axios({
        method:"get",
        url:"/supPro/"+id
      }).then(({data})=>{
        console.log("gongyingshang商品",data)
        axios({
          method:"post",
           url: "/sopPropducts",
           data:{
             data,
             number:this.number,
             shopId:this.id
           }
        }).then(()=>{
          console.log("添加的",...data)
          this.setProducts();
        })
      })
      }
  },
  created(){
    console.log(1234)
    this.setSupProducts()
  }
};
</script>

<style>
</style>