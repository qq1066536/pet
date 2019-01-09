<template>
  <div>
    <el-table :data="producers" style="width: 100%">
      <el-table-column prop="supplier.No" label="编号" width="150"></el-table-column>
      <el-table-column prop="supplier.name" label="供应商" width="150"></el-table-column>
      <el-table-column prop="supplier.addr" label="地址" width="150"></el-table-column>
      <el-table-column prop="supplier.tel" label="电话" width="150"></el-table-column>
      <el-table-column prop="supplier.website" label="网址" width="150"></el-table-column>
      <el-table-column prop="supplier.desc" label="简介" width="150"></el-table-column>
      <el-table-column prop="supplier.business_lic" label="图片" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="showById(scope.row._id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["producers", "show"],
 methods:{
    showById(id){
      console.log("id",id)
}
 }
};
</script>
<style>
</style>
