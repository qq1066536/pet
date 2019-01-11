<template>
    <div>
        <el-upload
            action="/upload"
            list-type="picture-card"
            :on-remove="handleRemove"
            multiple
            :on-success="test"
            :file-list="product.img"
        >
            <i class="el-icon-plus"></i>
        </el-upload>
        <!-- <el-dialog :visible.sync="dialogVisible.visible">
            <img width="100%" :src="product.img.url" alt="">
        </el-dialog> -->
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {mapState,mapMutations}=createNamespacedHelpers("SupProducts")

export default {
    computed:{
        ...mapState(["product"])
    },
    methods: {
        ...mapMutations(["adddialogImageUrls","setUrl","removedialogImageUrls"]),
        handleRemove(file, fileList) {
            console.log(file.url);
            this.removedialogImageUrls({url:file.url})
        },
        // handlePictureCardPreview(file) {
        //     console.log(file)
        //     this.setUrl("http://127.0.0.1:3000/upload/"+file.response)
        //     this.setVisible(true)
        // },
        test(res){
            console.log(res)
            this.adddialogImageUrls("http://127.0.0.1:3000/upload/"+res)
        }
    }
};
</script>

<style>
</style>
