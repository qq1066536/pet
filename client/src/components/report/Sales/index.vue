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
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("productsMoudles");
export default {
  data() {
    return {
      type: "商品类销售额统计",
      salesAxisData: [],
      seriesDataPro: [],
      seriesDataSer: [],
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
    // console.log();
  },
  methods: {
    ...mapActions(["getTime", "getSession"]),
    showChart() {
      let myChart = echarts.init(this.$refs.myChart);
      if (this.type == "商品类销售额统计") {
        axios({
          url: "/salePro",
          method: "get",
          params: {
            trueTime: this.trueTime,
            sessionId: JSON.parse(window.localStorage.getItem("session"))._id
          }
        }).then(({ data }) => {
          // console.log("data", data);
          this.salesAxisData = data.axisData;
          this.seriesDataPro = data.seriesDataPro;
          myChart.setOption(this.proOptions, true);
        });
      } else {
        axios({
          url: "/salePro",
          method: "get",
          params: {
            trueTime: this.trueTime,
            sessionId: JSON.parse(window.localStorage.getItem("session"))._id
          }
        }).then(({ data }) => {
          // console.log("data", data);
          this.salesAxisData = data.axisData;
          this.seriesDataSer = data.seriesDataSer;
          myChart.setOption(this.serOptions, true);
        });
      }
    }
  },
  computed: {
    ...mapState(["trueTime"]),
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
          data: ["狗粮", "猫粮", "其它"]
        },
        xAxis: {
          data: this.salesAxisData
        },
        yAxis: {},
        series: [
          {
            name: "狗粮",
            type: "bar",
            barWidth: 40,
            stack: "商品",
            color: "#61a0a8",
            data: [
              this.seriesDataPro[0][0].value,
              this.seriesDataPro[1][0].value,
              this.seriesDataPro[2][0].value,
              this.seriesDataPro[3][0].value,
              this.seriesDataPro[4][0].value,
              this.seriesDataPro[5][0].value
            ]
          },
          {
            name: "猫粮",
            type: "bar",
            barWidth: 40,
            stack: "商品",
            color: "#d48265",
            data: [
              this.seriesDataPro[0][1].value,
              this.seriesDataPro[1][1].value,
              this.seriesDataPro[2][1].value,
              this.seriesDataPro[3][1].value,
              this.seriesDataPro[4][1].value,
              this.seriesDataPro[5][1].value
            ]
          },
          {
            name: "其它",
            type: "bar",
            barWidth: 40,
            stack: "商品",
            color: "#91c7ae",
            data: [
              this.seriesDataPro[0][2].value,
              this.seriesDataPro[1][2].value,
              this.seriesDataPro[2][2].value,
              this.seriesDataPro[3][2].value,
              this.seriesDataPro[4][2].value,
              this.seriesDataPro[5][2].value
            ]
          }
        ]
      };
    },
    serOptions() {
      return {
        title: {
          text: "近6个月服务类销售额统计"
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
          data: ["洗护", "寄养", "其它"]
        },
        xAxis: {
          data: this.salesAxisData
        },
        yAxis: {},
        series: [
          {
            name: "洗护",
            type: "bar",
            barWidth:40,
            stack: "服务",
            color: "#61a0a8",
            data: [
              this.seriesDataSer[0][0].value,
              this.seriesDataSer[1][0].value,
              this.seriesDataSer[2][0].value,
              this.seriesDataSer[3][0].value,
              this.seriesDataSer[4][0].value,
              this.seriesDataSer[5][0].value
            ]
          },
          {
            name: "寄养",
            type: "bar",
            barWidth:40,
            stack: "服务",
            color: "#d48265",
            data: [
              this.seriesDataSer[0][1].value,
              this.seriesDataSer[1][1].value,
              this.seriesDataSer[2][1].value,
              this.seriesDataSer[3][1].value,
              this.seriesDataSer[4][1].value,
              this.seriesDataSer[5][1].value
            ]
          },
            {
            name: "其它",
            type: "bar",
            barWidth: 40,
            stack: "服务",
            color: "#91c7ae",
            data: [
              this.seriesDataSer[0][2].value,
              this.seriesDataSer[1][2].value,
              this.seriesDataSer[2][2].value,
              this.seriesDataSer[3][2].value,
              this.seriesDataSer[4][2].value,
              this.seriesDataSer[5][2].value
            ]
          }
        ]
      };
    }
  }
};
</script>

<style>
.total {
  width: 100%;
  height: 500px;
}
</style>
