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
const { mapActions, mapState } = createNamespacedHelpers("productsMoudles");
export default {
  data() {
    return {
      type: "商品类销售额统计",
      salesAxisData: [],
      salesSeriesData: [],
      zoom: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showChart();
    });
    this.getSession();
    // console.log('商店id',this.shopId);
    // console.log('shopId',);
    this.getTime();
    // this.getOrders()
    console.log()
  },
  methods: {
    ...mapActions(["getTime","getSession"]),
    showChart() {
      let myChart = echarts.init(this.$refs.myChart);
      if (this.type == "商品类销售额统计") {
        axios({
          url: "/salePro",
          method: "get",
          params:{
            trueTime:this.trueTime,
            sessionId:JSON.parse(window.localStorage.getItem("session"))._id
          }
        }).then(({data}) => {
          console.log("data",data)
          this.salesAxisData = data.axisData;
          this.salesSeriesData = data.seriesData;
          myChart.setOption(this.proOptions, true);
        });
      }
    }
  },
  computed: {
    ...mapState(["trueTime",]),
    proOptions() {
      return {
        title: {
          text: "近6个月商品类销售额统计"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "right",
          data: ["狗粮", "猫粮", "其他"]
        },
        xAxis: {
          data: this.salesAxisData
        },
        yAxis: {},
        series: [
          {
            name: "销售额",
            type: "bar",
            data: this.salesSeriesData
          },
        ]
      };
    }
  }
};
</script>

<style>
.total{
  width: 1000px;
  height: 500px;
}
</style>
