<template>
    <el-upload
        action="/upload/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="product"
        list-type="picture"
    >
        <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    name: "upload",
    computed: {
        ...mapState(["product"])
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    }
};
</script>

<style>
</style>
