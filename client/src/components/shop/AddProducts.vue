<template>
  <span class="left">
    <el-button type="primary" @click="dialogVisible = true">新增商品</el-button>
    <el-dialog title="新增门店商品" :visible.sync="dialogVisible" width="40%">
      <el-form status-icon ref="addForm" label-width="100px" class="demo-addForm">
        <el-form-item label="品牌:" prop="name">
          <el-input type="text" v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品类:" prop="type">
          <el-input type="text" v-model="addForm.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="材质:" prop="makings">
          <el-input type="text" v-model="addForm.makings" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用规格:" prop="spec">
          <el-input type="text" v-model="addForm.spec" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专属规格:" prop="suit">
          <el-input type="text" v-model="addForm.suit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装规格:" prop="weight">
          <el-input type="text" v-model="addForm.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="口味:" prop="taste">
          <el-input type="text" v-model="addForm.taste" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特殊功用:" prop="effect">
          <el-input type="text" v-model="addForm.effect" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产地:" prop="addr">
          <el-input type="text" v-model="addForm.addr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生产日期:" prop="pro_date">
          <el-date-picker v-model="addForm.pro_date" type="date" placeholder="选择日期"></el-date-picker>
          <!-- <el-input type="text" v-model="addForm.pro_date" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="保质期:" prop="valid_date">
          <el-input type="text" v-model="addForm.valid_date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商编号:" prop="No">
          <el-input type="text" v-model="addForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="特色说明:" prop="desc">
          <el-input type="text" v-model="addForm.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格:" prop="price">
          <el-input type="text" v-model="addForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量:" prop="number">
          <el-input type="text" v-model="addForm.number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        action="/upload"
        list-type="picture-card"
        :on-success="handleAvatarSuccess"
        :on-preview="handlePictureCardPreview"
      >
        <i class="el-icon-plus"></i>
      </el-upload>

      <img width="100%" :img="dialogImageUrl" alt>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPro">确 定</el-button>
        <el-button @click="resetForm('addForm')">重置</el-button>
      </span>
    </el-dialog>
  </span>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers, mapMutations } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("productsMoudles");
export default {
  data() {
    return {
      addForm: {
        name: "",
        type: "",
        makings: "",
        spec: "",
        suit: "",
        weight: "",
        taste: "",
        effect: "",
        addr: "",
        pro_date: "",
        valid_date: "",
        No: "",
        desc: "",
        price: "",
        number: ""
      },
      img: [],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  computed: {
    ...mapState(["shopId", "userId"])
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ...mapMutations(["setShopId"]),
    ...mapActions(["setProducts", "getSession"]),
    addPro() {
      // console.log(1234);
      // console.log("shopId", this.shopId);
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
        number
      } = this.addForm;
      axios({
        method: "get",
        url: "/shop",
        params: {
          userId: this.userId
        }
      })
        .then(({ data }) => {
          // console.log(data)
          if (data[0].account == "封禁" || data[0].account == "待审核") {
            alert("门店已被封，暂时不能添加商品哦");
          } else {
            // console.log(1234);

            // let {
            //   name,
            //   type,
            //   makings,
            //   spec,
            //   suit,
            //   weight,
            //   taste,
            //   effect,
            //   addr,
            //   pro_date,
            //   valid_date,
            //   No,
            //   desc,
            //   price,
            //   number
            // } = this.addForm;
            axios({
              method: "post",
              url: "/sopPropducts",
              data: {
                // name: name,
                // type: type,
                // makings: JSON.stringify(makings),
                // spec: JSON.stringify(spec),
                // suit: JSON.stringify(suit),
                // weight: JSON.stringify(weight),
                // taste: JSON.stringify(taste),
                // effect: JSON.stringify(effect),
                // addr: addr,
                // pro_date: pro_date,
                // valid_date: valid_date,
                // No: No,
                // desc: desc,
                // price: price,
                // img: JSON.stringify(this.img),
                // number,
                ...this.addForm,
                img:this.img,
                shopId: this.shopId
              }
            }).then(() => {
              // console.log(123123);
              this.dialogVisible = false;
              this.setProducts();
              // this.$refs.addForm.resetFileds();
            });
          }
        })
        .then(() => {
          // console.log(123123)
          this.dialogVisible = false;
          this.setProducts();
          // this.$refs.addForm.resetFileds();
        });
    },
    handleRemove() {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res) {
      this.img.push({ url: "/upload/" + res });
      // console.log(this.img);
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
.left {
  display: inline-block;
  margin-right: 20px;
}
</style>
