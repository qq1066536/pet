<template>
  <div>
    <el-radio-group v-model="type" @change="showChart">
      <el-radio-button label="商品类销售额统计"></el-radio-button>
      <el-radio-button label="服务类销售额统计"></el-radio-button>
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
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import axios from "axios";
import { createNamespacedHelpers, mapMutations } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("salesModule");
export default {
  data() {
    return {
      type: "商品类销售额统计",
      salesAxisData: [],
      salesSeriesData: [],
      zoom: 0
    };
  },
  created() {
    this.$nextTick(() => {
      this.showChart();
    });
    this.getTime();
  },
  methods: {
    ...mapActions(["getTime"]),
    showChart() {
    console.log(this.getTime())
      let myChart = echarts.init(this.$refs.myChart);
      if (this.type == "商品类销售额统计") {
        axios({
          url: "/shop/saleTotal",
          method: "get"
        }).then(res => {
          this.salesAxisData = res.data.axisData;
          this.salesSeriesData = res.data.seriesData;
          myChart.setOption(this.classesOptions, true);
        });
      }
    }
  }
};
</script>

<style>
</style>
