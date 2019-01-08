<template>
    <div>
        <el-button plain>新增</el-button>
        <el-button plain>修改</el-button>
        <el-button plain>删除</el-button>
        <el-table :data="products" height="250" border style="width: 100%">
            <el-table-column prop="name" label="产品" width="180"></el-table-column>
            <el-table-column prop="type" label="类型" width="180"></el-table-column>
            <el-table-column prop="weight" label="重量"></el-table-column>
            <el-table-column prop="making" label="成分"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import Axios from "axios";
export default {
    data() {
        return {
            products: []
        };
    },
    created: function() {
        this.getproducts();
    },
    computed: {
        id: function() {
            return "5c32ef8a6c9da2c6832b81fe";
        }
    },
    methods: {
        getproducts() {
            Axios({
                url: "/supplier",
                method: "get",
                params: {
                    id: this.id,
                    page: 1,
                    rows: 5
                }
            }).then(({ data }) => {
                this.products = data;
            });
        }
    }
};
</script>

<style>
</style>
