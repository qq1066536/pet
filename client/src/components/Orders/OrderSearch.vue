<template>
  <div class="el-search">
    <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
      <el-select v-model="type" slot="prepend" placeholder="请选择">
        <el-option label="手机号" value="phone"></el-option>
        <el-option label="姓名" value="name"></el-option>
        <el-option label="订单编号" value="_id"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
    </el-input>
  </div>
</template>

<script>
import { createNamespacedHelpers} from "vuex";
const { mapActions,mapMutations} = createNamespacedHelpers("orderModules");
export default {
    data(){
        return{
            value: "",
            type: "",
        }
    },
  methods: {
      ...mapActions(['getOrders']),
      ...mapMutations(['setSearch']),
      searchBtn(){
          let {type,value} = this;
          this.setSearch({type,value});
          this.getOrders({page:1,rows: 5,type,value});
      }
  }
};
</script>

<style>
.el-select .el-input {
  width: 100px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-search {
    margin-top: 15px;
    width: 500px;
}
</style>
