<template>

  <el-pagination layout="prev, pager, next,total,sizes,jumper" :total="pagination.total"
  :page-size="pagination.eachpage"
  :page-sizes="[5,10,20
  ]"
  @current-change="changePage"
  @size-change="changeSize"
  >

  </el-pagination>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState,mapMutations } = createNamespacedHelpers("productsMoudles");
export default {
    data(){
        return{
            pagesize:""
        }
    },
    computed:{
        ...mapState(["pagination","search","id"])
    },
  methods: {
      ...mapActions(["setProducts"]),
      ...mapMutations(["setPagination"]),
      changePage(page){
          this.setProducts({page,rows:this.pagesize,type:this.search.type,value:this.search.value})
      },
      changeSize(size){
          this.pagesize=size
          this.setProducts({page:1,rows:size,type:this.search.type,value:this.search.value})
      }
  }
};
</script>

<style>
</style>
