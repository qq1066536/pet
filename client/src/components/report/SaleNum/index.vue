<template>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  <div>
    <el-radio-group v-model="type" @change="showRep">
      <el-radio-button label="店铺商品销量统计"></el-radio-button>
      <el-radio-button label="店铺服务销量统计"></el-radio-button>
    </el-radio-group>
    <div id="saleNum" class="total" ref="saleNum"></div>
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
import "echarts/extension/bmap/bmap";
export default {
  // 指定图表的配置项和数据
  data() {
    return {
      type: "店铺商品销量统计"
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showRep();
    });
  },
  methods: {
    showRep() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.saleNum);
      // 使用刚指定的配置项和数据显示图表。
      if (this.type == "店铺商品销量统计") {
        myChart.setOption(this.proOption, true);
        // alert(123);
      } else {
        myChart.setOption(this.serOption, true);
      }
    }
  },
  computed: {
    proOption() {
      return {
        title: {
          text: "店铺销量统计"
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
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
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
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "狗粮",
            type: "bar",
            data: [320, 332, 301, 334, 390, 330, 320, 701, 734, 1090, 1130, 1120]
          },
          {
            name: "猫粮",
            type: "bar",
            stack: "猫",
            data: [120, 132, 101, 134, 90, 230, 210, 701, 734, 1090, 1130, 1120]
          },
          {
            name: "狗盆",
            type: "bar",
            stack: "猫",
            data: [220, 182, 191, 234, 290, 330, 310, 701, 734, 1090, 1130, 1120]
          },
          {
            name: "猫盆",
            type: "bar",
            stack: "猫",
            data: [150, 232, 201, 154, 190, 330, 410, 701, 734, 1090, 1130, 1120]
          },
          {
            name: "狗绳",
            type: "bar",
            barWidth: 10,
            data: [862, 1018, 964, 1026, 1679, 1600, 1570, 701, 734, 1090, 1130, 1120],
          },
          {
            name: "小狗棉袄",
            type: "bar",
            barWidth: 10,
            stack: "狗",
            data: [620, 732, 701, 734, 1090, 1130, 1120, 701, 734, 1090, 1130, 1120]
          },
          {
            name: "猫屎铲",
            type: "bar",
            stack: "狗",
            data: [120, 132, 101, 134, 290, 230, 220, 701, 734, 1090, 1130, 1120]
          },
          {
            name: "其他",
            type: "bar",
            stack: "狗",
            data: [62, 82, 91, 84, 109, 110, 120, 701, 734, 1090, 1130, 1120]
          }
        ]
      };
    },
    serOption() {
      return {
        title: {
          text: "店铺销量统计"
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
          data: ["寄养服务", "洗护服务", "其他"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
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
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "寄养服务",
            type: "bar",
            barWidth: 10,
            color: "#FE8463",
            data: [320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390]
          },
          {
            name: "洗护服务",
            type: "bar",
            barWidth: 10,
            color: "#9BCA63",
            data: [120, 132, 101, 134, 90, 230, 210, 390, 330, 320, 320, 332]
          },
          {
            name: "其他",
            type: "bar",
            barWidth: 10,
            color: "#E87C25",
            data: [220, 182, 191, 234, 290, 330, 310, 390, 330, 320, 320, 332]
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.total {
  width: 100%;
  height: 500px;
}
</style>
