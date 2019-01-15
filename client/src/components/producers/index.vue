<template>
  <div>
    <el-table :cell-style="cellStyle" :data="producers" style="width: 100%">
      <el-table-column label="信息状态" prop="status"></el-table-column>
      <el-table-column prop="name" label="公司名称" width="120"></el-table-column>
      <el-table-column prop="desc" label="公司简介" width="120"></el-table-column>
      <el-table-column prop="corporate" label="法定代表人" width="120"></el-table-column>
      <el-table-column prop="date" label="成立日期" width="120"></el-table-column>
      <el-table-column prop="office" label="登记机关" width="120"></el-table-column>
      <el-table-column prop="management" label="经营范围" width="120"></el-table-column>
      <el-table-column prop="capital" label="注册资本" width="120"></el-table-column>
      <el-table-column prop="No" label="信用代码" width="120"></el-table-column>
      <el-table-column prop="addr" label="所在地址" width="120"></el-table-column>
      <el-table-column prop="tel" label="电话号码" width="120"></el-table-column>
      <el-table-column prop="website" label="公司网站" width="120"></el-table-column>
      <el-table-column prop="license" label="营业执照" width="120">
        <template slot-scope="scope">
          <img :src="'http://127.0.0.1:3000/upload/'+scope.row.license" min-width="70" height="70">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="showById(scope.row._id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改板块 -->
    <el-dialog title="修改供应商信息" :visible.sync="dialogVisible" width="30%">
      <el-form :model="producer" status-icon ref="updateForm" label-width="100px">
        <!-- <span class="red">【信息审核中...】</span> -->
        <el-form-item label="公司名称">
          <el-input v-model="producer.name"></el-input>
        </el-form-item>
        <el-form-item label="公司简介">
          <el-input v-model="producer.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人">
          <el-input v-model="producer.corporate"></el-input>
        </el-form-item>
        <el-form-item label="成立日期">
          <el-input v-model="producer.date"></el-input>
        </el-form-item>
        <el-form-item label="登记机关">
          <el-input v-model="producer.office"></el-input>
        </el-form-item>
        <el-form-item label="经营范围">
          <el-input v-model="producer.management"></el-input>
        </el-form-item>
        <el-form-item label="注册资本">
          <el-input v-model="producer.capital"></el-input>
        </el-form-item>
        <el-form-item label="信用代码">
          <el-input v-model="producer.No"></el-input>
        </el-form-item>
        <el-form-item label="所在地址">
          <el-input v-model="producer.addr"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="producer.tel"></el-input>
        </el-form-item>
        <el-form-item label="公司网站">
          <el-input v-model="producer.website"></el-input>
        </el-form-item>
        <el-form-item label="营业执照">
          <el-upload
            class="avatar-uploader"
            action="/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="producer.license"
              :src="'http://127.0.0.1:3000/upload/'+producer.license"
              class="avatar"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateInformation">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";

export default {

  data() {
    return {
      producers: [],
      producer: {},
      dialogVisible: false,
      isActive: true,
      hasError: false,
      centerDialogVisible: false,
      userId: ""
    };
  },

  created() {
    this.getuserId();
  },

  methods: {
cellStyle:function({column}){
 if(column.label === "信息状态"){
                    return 'color:red'
                }else{
                    return ''
                }
            },
    update() {
      (this.centerDialogVisible = false),
        (this.isActive = false),
        (this.hasError = true);
    },

    show() {
      axios({
        method: "get",
        url: "/supplier/info",
        params: {
          id: this.userId
        }
      }).then(({ data }) => {
        this.producers = data;
      });
    },
    getuserId() {
      axios({
        method: "get",
        url: "/users/getSession"
      }).then(({ data }) => {
        this.userId = data._id;
        this.show();
      });
    },
    showById(id) {
      this.dialogVisible = true;
      axios({
        method: "get",
        url: "/supplier/supplierInfo/" + id
      }).then(({ data }) => {
        this.producer = data;
      });
    },
    updateInformation() {
      this.dialogVisible = false;
      let {
        name,
        desc,
        corporate,
        date,
        office,
        management,
        capital,
        No,
        addr,
        tel,
        website,
        license
      } = this.producer;
      axios({
        method: "put",
        url: "/supplier/updateinfo/" + this.producer._id,
        data: {
          name,
          desc,
          corporate,
          date,
          office,
          management,
          capital,
          No,
          addr,
          tel,
          website,
          status: "待审核",
          license
        }
      }).then(() => {
        this.show();
      });
    },
    handleAvatarSuccess(res) {
      this.producer.license = res;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>
<style scoped>
.avatar {
  width: 160px;
  height: 100px;
}
.red {
  color: tomato;
}
</style> 
