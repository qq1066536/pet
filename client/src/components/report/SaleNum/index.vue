<template>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  <div>
    <div id="saleNum" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.haha();
  },
  methods: {
    haha() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("saleNum"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "店铺销量统计"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style>
</style>
