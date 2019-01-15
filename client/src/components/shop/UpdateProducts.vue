<template>
  <div>
    <el-dialog title="编辑商品" :visible.sync="closeUpdateVisible" width="40%">
      <el-form status-icon ref="updateForm" label-width="100px" class="demo-updateForm">
        <el-form-item label="品牌:" prop="name">
          <el-input type="text" v-model="product.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品类:" prop="type">
          <el-input type="text" v-model="product.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="材质:" prop="makings">
          <el-input type="text" v-model="product.makings" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用规格:" prop="spec">
          <el-input type="text" v-model="product.spec" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专属规格:" prop="suit">
          <el-input type="text" v-model="product.suit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装规格:" prop="weight">
          <el-input type="text" v-model="product.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="口味:" prop="taste">
          <el-input type="text" v-model="product.taste" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特殊功用:" prop="effect">
          <el-input type="text" v-model="product.effect" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产地:" prop="addr">
          <el-input type="text" v-model="product.addr" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="生产日期:" prop="pro_date">
          <el-date-picker v-model="product.pro_date" type="date" placeholder="选择日期"></el-date-picker>
          <!-- <el-input type="text" v-model="product.pro_date" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="保质期:" prop="valid_date">
          <el-input type="text" v-model="product.valid_date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商编号:" prop="No">
          <el-input type="text" v-model="product.No" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特色说明:" prop="desc">
          <el-input type="text" v-model="product.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格:" prop="price">
          <el-input type="text" v-model="product.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量:" prop="number">
          <el-input type="text" v-model="product.number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        action="/upload"
        :file-list="product.img"
        :on-success="handleAvatarSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        list-type="picture-card"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <!-- <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="this.product.img" alt>
      </el-dialog> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="setupdateVisible(false)">取 消</el-button>
        <el-button type="primary" @click="updatePro">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapMutations, mapState } = createNamespacedHelpers(
  "productsMoudles"
);
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  computed: {
    ...mapState(["product", "updateVisible"]),
    closeUpdateVisible: {
      get() {
        return this.updateVisible;
      },
      set() {
        this.setupdateVisible(false);
      }
    }
  },

  methods: {
    ...mapActions(["setProducts"]),
    ...mapMutations(["setupdateVisible"]),
    updatePro() {
      // if (this.student.src) {
      let {
        name,
        type,
        makings,
        spec,
        suit,
        weight,
        taste,
        effect,
        addr,
        pro_date,
        valid_date,
        No,
        desc,
        price,
        img,
        number
      } = this.product;
      //   console.log("图片数组", this.product.img)
      axios({
        method: "put",
        url: "/sopPropducts/" + this.product._id,
        data: {
          name,
          type,
          makings,
          spec,
          suit,
          weight,
          taste,
          effect,
          addr,
          pro_date,
          valid_date,
          No,
          desc,
          price,
          img,
          number
        }
      }).then(() => {
        this.setProducts();
        this.setupdateVisible(false);
      });
    },
    //     handleRemove(file, fileList) {
    // //   console.log(file, fileList);
    // },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file) {
      // console.log(file, fileList);
      let arr = this.img;
      for (let i in arr) {
        if (arr[i].uid == file.uid) {
          arr.splice(i, 1);
          break;
        }
      }
      this.img = arr;
    },
    handlePreview() {
      // console.log(file);
    },
    handleAvatarSuccess(res) {
      this.img.push("http://127.0.0.1:3000/upload/" + res);
      //  console.log("tupian",this.img)
    }
  }
};
</script>
<style scoped>
.box-card {
  width: 500px;
  margin: auto;
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
.flex {
  display: flex;
}
</style>
