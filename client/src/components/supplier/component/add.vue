<template>
    <div>
        <el-dialog :title="title.name" :visible.sync="dialogVisible.visible">
            <el-form :model="product" ref="Form">
                <el-form-item label="产品" prop="name">
                    <el-input autocomplete="off" v-model="product.name"></el-input>
                </el-form-item>
                <el-form-item label="品类" prop="type">
                    <el-input autocomplete="off" v-model="product.type"></el-input>
                </el-form-item>
                <el-form-item label="成分" prop="makings">
                    <el-input autocomplete="off" v-model="product.makings"></el-input>
                </el-form-item>
                <el-form-item label="重量" prop="weight">
                    <el-input autocomplete="off" v-model="product.weight"></el-input>
                </el-form-item>
                <el-form-item label="产地" prop="addr">
                    <el-input autocomplete="off" v-model="product.addr"></el-input>
                </el-form-item>
                <el-form-item label="适用" prop="spec">
                    <el-input autocomplete="off" v-model="product.spec"></el-input>
                </el-form-item>
                <el-form-item label="适用品种" prop="suit">
                    <el-input autocomplete="off" v-model="product.suit"></el-input>
                </el-form-item>
                <el-form-item label="口味" prop="taste">
                    <el-input autocomplete="off" v-model="product.taste"></el-input>
                </el-form-item>
                <el-form-item label="功效" prop="effrct">
                    <el-input autocomplete="off" v-model="product.effect"></el-input>
                </el-form-item>
                <el-form-item label="生产日期" prop="pro_date">
                    <!-- <el-input autocomplete="off" v-model="product.pro_date"></el-input> -->
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="product.pro_date"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="有效期" prop="valid_date">
                    <el-input autocomplete="off" v-model="product.valid_date"></el-input>
                </el-form-item>
                <el-form-item label="生产批号" prop="No">
                    <el-input autocomplete="off" v-model="product.No"></el-input>
                </el-form-item>
                <el-form-item label="介绍" prop="desc">
                    <el-input autocomplete="off" v-model="product.desc"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input autocomplete="off" v-model="product.price"></el-input>
                </el-form-item>
                <!-- <el-form-item label="生产日期" prop="type">
                    <el-input autocomplete="off" v-model="product.pro_date"></el-input>
                </el-form-item>-->
                <!-- <el-form-item label="图片">
                    <el-input autocomplete="off" v-model="product.img"></el-input>
                </el-form-item>-->
                <Upload></Upload>
                <el-form-item label="库存" prop="inventory">
                    <el-input autocomplete="off" v-model="product.inventory"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelDialog(false)">取 消</el-button>
                <el-button type="primary" @click="test(false)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Upload from "./upload.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
    "SupProducts"
);
export default {
    name: "Add",
    components: {
        Upload
    },
    computed: {
        ...mapState(["dialogVisible", "product", "title"])
    },
    // created: function() {
    //     console.log(this.product);
    // },
    created: function() {
        // console.log(this.product);
    },
    methods: {
        ...mapMutations(["setDialogVisible", "setProduct"]),
        ...mapActions([
            "getProduct",
            "updateProduct",
            "addProduct",
            "setProducts"
        ]),
        cancelDialog(value) {
            this.setDialogVisible(value);
            this.setProduct({});
        },
        test(value) {
            // console.log(this.title)
            if (value) {
                this.getProduct();
            }
            console.log(this.title.name);
            if (this.title.name == "新增") {
                this.addProduct();
            } else {
                // console.log(this.title);

                this.updateProduct();
            }
            this.setDialogVisible(value);
            this.setProduct({});
        }
    }
};
</script>

<style>
</style>
