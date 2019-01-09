<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.curpage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pagination.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    ></el-pagination>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("orderModules");
export default {
  data(){
    return{
      currentSize: "",
    }
  },
  computed: {
    ...mapState(["pagination", "search"])
  },
  methods: {
    ...mapActions(["getOrders"]),
    handleSizeChange(size) {
      // console.log(`每页 ${val} 条`);
      this.getOrders({
        page: 1,
        rows: size,
        type: this.search.type,
        value: this.search.value
      });
      this.currentSize = size;
    },
    handleCurrentChange(page) {
      //   console.log(`当前页: ${val}`);
      this.getOrders({page,rows:this.currentSize,type:this.search.type,value:this.search.value});
    }
  },
};
</script>

<style>
</style>
