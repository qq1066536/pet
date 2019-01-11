<template>
  <div>
    <el-button
      type="primary"
      v-bind:class="{upBtn:isActive,'upBtnTo': hasError}"
      plain
      @click="dialogVisible = true"
    >修改信息</el-button>
    <span v-if="producer.status == 0" class="red">【信息审核中...】</span>
    <div class="mainLayout">
      <el-form label-width="100px" style="width:400px">
        <el-form-item label="公司名称:">{{producer.name}}</el-form-item>
        <el-form-item label="公司简介:">{{producer.desc}}</el-form-item>
        <el-form-item label="法定代表人:">{{producer.corporate}}</el-form-item>
        <el-form-item label="成立日期:">{{producer.date}}</el-form-item>
        <el-form-item label="登记机关:">{{producer.office}}</el-form-item>
        <el-form-item label="经营范围:">{{producer.management}}</el-form-item>
      </el-form>
      <el-form label-width="100px" style="width:400px">
        <el-form-item label="注册资本:">{{producer.capital}}</el-form-item>
        <el-form-item label="信用代码:">{{producer.No}}</el-form-item>
        <el-form-item label="所在地址:">{{producer.addr}}</el-form-item>
        <el-form-item label="电话号码:">{{producer.tel}}</el-form-item>
        <el-form-item label="公司网站:">{{producer.website}}</el-form-item>
        <el-form-item label="营业执照:">
          <img
            class="films-img"
            v-bind:src="'http://127.0.0.1:3000/upload/'+producer.license"
            style="width:240px;height:160px"
            alt
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- <p v-bind:class="{auditor:isActive,'auditoring': hasError}">资料待平台管理员审核中······</p> -->
    <!-- 修改板块 -->
    <el-dialog title="修改供应商信息" :visible.sync="dialogVisible" width="30%">
      <el-form :model="producer" status-icon ref="updateForm" label-width="100px">
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
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <span style="color:red;font-size: 20px;">资料待平台管理员审核中······</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      producer: {},
      dialogVisible: false,
      isActive: true,
      hasError: false,
      centerDialogVisible: false,
      userId: ""
    };
  },
  created() {
    // axios({
    //   method:"get",
    //   url:"/getSession"
    // }).then(({data})=>{
    //   this.userId=data._id
    // })
    this.auditor();
  },
  computed: {
    id: function() {
      return "5c32ef8a6c9da2c6832b81fe";
    }
  },
  methods: {
    auditor() {
      axios({
        method: "get",
        url: "/supplier/info/" + this.id //(this.userId)
      }).then(({ data }) => {
        this.show();
        /* if (data.status == "已审核") {
          this.show();
        } else {
          this.centerDialogVisible = true;
        } */
      });
    },
    update() {
      (this.centerDialogVisible = false),
        (this.isActive = false),
        (this.hasError = true);
    },
    show() {
      axios({
        method: "get",
        url: "/supplier/info/" + this.id //(this.userId)
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
          status: "0",
          license
        }
      }).then(() => {
        // this.show();
        this.auditor();
      });
    },
    handleAvatarSuccess(res, file) {
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
.mainLayout {
  display: flex;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upBtnTo {
  font-size: 30px;
  display: none;
}
.upBtn {
  display: block;
  color: red;
}
.red {
  color: tomato;
}
</style>

