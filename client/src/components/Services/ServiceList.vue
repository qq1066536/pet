<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column label="服务名称" width="100" prop="name"></el-table-column>
    <el-table-column label="服务类别" width="90" prop="type"></el-table-column>
    <el-table-column label="服务时间" width="140">
      <template slot-scope="scope">
        <el-popover placement="top">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.startTime }}</el-tag>
            <span>--</span>
            <el-tag size="medium">{{ scope.row.endTime }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="宠物体重" width="100" prop="weight"></el-table-column>
    <el-table-column label="服务规格" width="80" prop="serviceType"></el-table-column>
    <el-table-column label="耗时" width="80" prop="time"></el-table-column>
    <el-table-column label="员工等级" width="80" prop="stuffLevel"></el-table-column>
    <el-table-column label="价格" width="100" prop="price"></el-table-column>
    <el-table-column label="备注信息" width="180" prop="text"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="updateService(scope.row._id)">修改</el-button>
        <el-button size="mini" type="danger" @click="delService(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "serviceModules"
);
import axios from "axios";
export default {
  computed: {
    ...mapState(["data", "dialogVisible"])
  },
  methods: {
    ...mapActions(["getServices", "setServiceInfo"]),
    ...mapMutations(["setUpdateVisible"]),
    updateService(id) {
      // console.log(id);
      this.setServiceInfo(id);
      this.setUpdateVisible(true);
    },
    delService(id) {
    //   console.log(id);
      axios({
        method: "delete",
        url: "/services/" + id
      }).then(() => {
        this.getServices();
      });
    }
  }
};
</script>

<style>
</style>
