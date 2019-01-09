<template>
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="名字" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
export default {

}
</script>

<style>

</style>
