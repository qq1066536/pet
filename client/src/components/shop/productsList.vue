<template>
    <div>
     <!-- <el-table :data="students" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄" width="180"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="showById( scope.row._id)">修改</el-button>
          <el-button size="mini" type="danger" @click="delStudent(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState,mapMutations } = createNamespacedHelpers("");
export default {
  props: [],
  computed: {
    ...mapState()
  },
  methods: {

      ...mapMutations(),
    ...mapActions(),
  }
};
</script>

<style>
</style>