<template>
    <div>
        <el-button plain @click="test(true)">新增</el-button>
        <el-dialog title="新增" :visible.sync="dialogVisible.visible">
            <el-form>
                <el-form-item label="产品">
                    <el-input autocomplete="off" v-model="product.name"></el-input>
                </el-form-item>
                <el-form-item label="品类">
                    <el-input autocomplete="off" v-model="product.type"></el-input>
                </el-form-item>
                <el-form-item label="成分">
                    <el-input autocomplete="off" v-model="product.makings"></el-input>
                </el-form-item>
                <el-form-item label="适用">
                    <el-input autocomplete="off" v-model="product.spec"></el-input>
                </el-form-item>
                <el-form-item label="适用品种">
                    <el-input autocomplete="off" v-model="product.suit"></el-input>
                </el-form-item>
                <el-form-item label="口味">
                    <el-input autocomplete="off" v-model="product.taste"></el-input>
                </el-form-item>
                <el-form-item label="功效">
                    <el-input autocomplete="off" v-model="product.effect"></el-input>
                </el-form-item>
                <el-form-item label="生产日期">
                    <el-input autocomplete="off" v-model="product.pro_date"></el-input>
                </el-form-item>
                <el-form-item label="有效期">
                    <el-input autocomplete="off" v-model="product.valid_date"></el-input>
                </el-form-item>
                <el-form-item label="生产批号">
                    <el-input autocomplete="off" v-model="product.No"></el-input>
                </el-form-item>
                <el-form-item label="介绍">
                    <el-input autocomplete="off" v-model="product.desc"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input autocomplete="off" v-model="product.price"></el-input>
                </el-form-item>
                <el-form-item label="生产日期">
                    <el-input autocomplete="off" v-model="product.pro_date"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-input autocomplete="off" v-model="product.img"></el-input>
                </el-form-item>
                <el-upload
                    class="avatar-uploader"
                    action="/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="stu.src" :src="stu.src" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-form-item label="库存">
                    <el-input autocomplete="off" v-model="product.inventory"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="test(false)">取 消</el-button>
                <el-button type="primary" @click="test(false)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
    "SupProducts"
);
export default {
    name: "Add",
    computed: {
        ...mapState(["dialogVisible", "product"])
    },
    created: function() {
        // console.log(this.product);
    },
    methods: {
        ...mapMutations(["setDialogVisible"]),
        ...mapActions(["getProduct"]),
        test(value) {
            if (value) {
                this.getProduct();
            }
            this.setDialogVisible(value);
        }
    }
};
</script>

<style>
</style>
