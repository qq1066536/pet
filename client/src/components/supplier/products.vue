<template>
    <div>
        <Add></Add>
        <el-table
            :data="products"
            height="250"
            border
            style="width: 100%;text-align:center;height:100%"
        >
            <el-table-column prop="name" label="产品"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="weight" label="重量"></el-table-column>
            <el-table-column prop="makings" label="成分"></el-table-column>
            <el-table-column prop="suit" label="适用"></el-table-column>
            <el-table-column prop="effect" label="功效"></el-table-column>
            <el-table-column prop="addr" label="产地"></el-table-column>
            <el-table-column prop="pro_date" label="生产日期"></el-table-column>
            <el-table-column prop="valid_date" label="有效期"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="desc" label="介绍"></el-table-column>
            <el-table-column prop="img" label="图片"></el-table-column>
            <el-table-column prop="inventory" label="库存"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="updateProduct(scope.row._id)">修改</el-button>
                    <el-button size="mini" @click="deleteProduct(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
// import Axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
    "SupProducts"
);
import Add from "./component/add.vue";
import axios from "axios"
export default {
    components: {
        Add
    },
    created: function() {
        // this.getproducts();
        this.setProducts();
    },
    computed: {
        ...mapState(["id", "products"])
    },
    methods: {
        ...mapMutations(["setDialogVisible", "getPid"]),
        ...mapActions(["setProducts", "getProduct"]),
        updateProduct(id) {
            // console.log(id);
            this.setDialogVisible(true);
            this.getPid(id);
            this.getProduct();
        },
        deleteProduct(id) {
            axios({
                method: "delete",
                url: `/supplier/${id}`
            }).then(() => {
                // console.log(id);
                // console.log("删除成功");
                this.setProducts()
            });
        }

        // getproducts() {
        //     Axios({
        //         url: "/supplier",
        //         method: "get",
        //         params: {
        //             id: this.id,
        //             page: 1,
        //             rows: 5
        //         }
        //     }).then(({ data }) => {
        //         data=data.rows
        //         console.log(data)

        //         for (let i = 0; i < data.length; i++) {
        //             for (let key in data[i]) {
        //                 if(Array.isArray(data[i][key])){
        //                     data[i][key]=data[i][key].join(",")
        //                 }
        //             }
        //         }

        //         this.products = data;
        //     });
        // }
    }
};
</script>

<style>
</style>
