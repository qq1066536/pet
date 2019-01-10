<template>
    <div>
        <el-button plain>新增</el-button>
        <el-button plain>修改</el-button>
        <el-button plain>删除</el-button>
        <el-table :data="products" height="250" border style="width: 100%;text-align:center;height:100%">
            <el-table-column prop="name" label="产品" width="180"></el-table-column>
            <el-table-column prop="type" label="类型" width="180"></el-table-column>
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
                for (let i = 0; i < data.length; i++) {
                    for (let key in data[i]) {
                        if(Array.isArray(data[i][key])){
                            data[i][key]=data[i][key].join(",")
                        }
                    }
                }

                this.products = data;
            });
        }
    }
};
</script>

<style>
</style>
