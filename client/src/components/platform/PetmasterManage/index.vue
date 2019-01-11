<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="账户名"></el-table-column>
            <el-table-column prop="info" label="信息"></el-table-column>
            <el-table-column prop="" label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="del( scope.row._id)">停用</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "张三",
          info: "ssssssssssssss",
        }
      ]
    };
  }
};
</script>
<style>
</style>
