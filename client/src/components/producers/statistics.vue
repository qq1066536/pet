<template>
  <div>
       <el-radio-group v-model="type" @change="showChart">
            <el-radio-button label="供应商销售数据"></el-radio-button>
            <el-radio-button label="地图"></el-radio-button>
        </el-radio-group>
    <div class="total" id="myChart" ref="myChart"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
export default {
  data() {
    return {
      type: "供应商销量统计",
      supplierAxisData: [],
      supplierSeriesData: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showChart();
    });
  },
  method:{
      showChart(){
          let myChart = echarts.init(this.$refs.myChart);
          axios({
            method:"get",
            url:"/"
          })
      }
  }
};
</script>

<style>
.total{
    width: 100%;
    height: 100%;
}
</style>