<template>
    <div>
        <el-upload
            action="/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
        >
            <i class="el-icon-plus"></i>
        </el-upload>
        <!-- <el-dialog :visible.sync="dialogVisible"> -->
            <img width="100%" :src="dialogImageUrl" alt>
        <!-- </el-dialog> -->
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            dialogImageUrl: "",
            // dialogVisible: false
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
        }
    }
};
</script>

<style>
</style>
