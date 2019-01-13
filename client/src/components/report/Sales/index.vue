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
      console.log(this.getTime());
      let myChart = echarts.init(this.$refs.myChart);
      if (this.type == "商品类销售额统计") {
        axios({
          url: "/salePro",
          method: "get"
        }).then(res => {
          this.salesAxisData = res.data.axisData;
          this.salesSeriesData = res.data.seriesData;
          myChart.setOption(this.proOptions, true);
        });
      }
    }
  },
  computed: {
    proOptions() {
      return {
        title: {
          text: "商品类销售额统计"
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
          data: [
            "狗粮",
            "猫粮",
            "狗盆",
            "猫盆",
            "",
            "狗绳",
            "小狗棉袄",
            "猫屎铲",
            "其他"
          ]
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
          }
        ]
      };
    }
  }
};
</script>

<style>
</style>
