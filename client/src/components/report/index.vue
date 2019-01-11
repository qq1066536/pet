<template>
  <div>
    <el-submenu>
      <template slot="title">
        <i class="el-icon-tickets"></i>
        <span>报表展示</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/manage/report/salenum">
          <i class="el-icon-menu"></i>
          <span slot="title">销售量统计</span>
        </el-menu-item>
        <el-menu-item index="/manage/report/sales">
          <i class="el-icon-menu"></i>
          <span slot="title">销售额统计</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.headerBgc {
  background-color: skyblue;
}
.container {
  height: 100%;
}
.menu {
  height: 100%;
}
.user {
  float: right;
  font-size: 16px;
}
</style>
