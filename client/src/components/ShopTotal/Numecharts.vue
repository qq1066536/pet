
<template>
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
</template>
 
<script>
import elementui from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import echarts from "echarts";
Vue.use(elementui);
Vue.use(echarts);
Vue.prototype.$echarts = echarts;

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  },
  mounted() {
    this.drawLine();
  }
};
</script>
 
<style scoped>
</style>