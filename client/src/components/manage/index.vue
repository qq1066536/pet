<template>
    <el-container class="container">
        <el-header class="headerBgc">
            <h1>宠物管理系统
                <span class="el-icon-service user">欢迎你：
                    <span class="el-icon-error"></span>
                </span>
            </h1>
        </el-header>
        <el-container class="aside">
            <el-aside width="200px" class="aside">
                <el-menu :default-active="path" class="menu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>平台管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/manage/platform/UserManage">
                                <i class="el-icon-menu"></i>
                                <span slot="title">用户管理</span>
                            </el-menu-item>
                            <el-menu-item index="/manage/platform/PetmasterManage">
                                <i class="el-icon-printer"></i>
                                <span slot="title">宠主管理</span>
                            </el-menu-item>
                            <el-menu-item index="/manage/platform/StoreManage">
                                <i class="el-icon-goods"></i>
                                <span slot="title">门店管理</span>
                            </el-menu-item>
                            <el-menu-item index="/manage/platform/Statistics">
                                <i class="el-icon-tickets"></i>
                                <span slot="title">统计</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
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
