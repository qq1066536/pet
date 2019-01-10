<template>
  <div class="el-search">
    <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
      <el-select v-model="type" slot="prepend" placeholder="请选择">
        <el-option label="服务名称" value="name"></el-option>
        <el-option label="服务类别" value="type"></el-option>
        <el-option label="服务规格" value="serviceType"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
    </el-input>
  </div>
</template>

<script>
import { createNamespacedHelpers} from "vuex";
const { mapActions,mapMutations} = createNamespacedHelpers("serviceModules");
export default {
    data(){
        return{
            value: "",
            type: "",
        }
    },
  methods: {
      ...mapActions(['getServices']),
      ...mapMutations(['setSearch']),
      searchBtn(){
          let {type,value} = this;
        // console.log(type,value)
          this.setSearch({type,value});
          this.getServices({page:1,rows: 5,type,value});
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
