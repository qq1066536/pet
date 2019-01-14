<template>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  <div>
    <el-radio-group v-model="type" @change="showRep">
      <el-radio-button label="店铺商品销量统计"></el-radio-button>
      <el-radio-button label="店铺服务销量统计"></el-radio-button>
    </el-radio-group>
    <div class="block">
      <span class="demonstration">请选择年份:</span>
      <el-date-picker v-model="value" type="year" placeholder="选择年份" @change="chooseYear"></el-date-picker>
    </div>

    <el-radio-group v-model="radio" @change="showBy" class="block">
      <el-radio label="按月份显示">按月份显示</el-radio>
      <el-radio label="按季度显示">按季度显示</el-radio>
      <el-radio label="按年份显示">按年份显示</el-radio>
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
import axios from "axios";
export default {
  // 指定图表的配置项和数据
  data() {
    return {
      type: "店铺商品销量统计",
      radio: "按月份显示",
      value: new Date(),
      xAxis: [],
      seriesDataPro: [],
      seriesDataService: [],
      seriesDataProQuter: [],
      seriesDataServiceQuter: [],
      seriesDataProYear: [],
      seriesDataServiceYear: []
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
        // console.log(this.value,JSON.parse(window.localStorage.getItem("session"))._id)
        // console.log(this.value)
        axios({
          method: "get",
          url: "/reportPro",
          params: {
            id: JSON.parse(window.localStorage.getItem("session"))._id,
            chooseYear: this.value
          }
        }).then(({ data }) => {
          // console.log(data);
          if (this.radio == "按季度显示") {
            this.xAxis = data.axisDataQuarter;
            this.seriesDataPro = data.seriesDataProQuter;
            myChart.setOption(this.proQuterOption, true);
          } else if (this.radio == "按年份显示") {
            this.seriesDataProYear = data.seriesDataProYear;
            this.seriesDataServiceYear = data.seriesDataServiceYear;
            myChart.setOption(this.pieOption, true);
          } else {
            this.xAxis = data.axisDataMonth;
            this.seriesDataPro = data.seriesDataPro;
            myChart.setOption(this.proOption, true);
          }
          // console.log(this.xAxis, this.seriesDataPro);
        });
      } else {
        axios({
          method: "get",
          url: "/reportPro",
          params: {
            id: JSON.parse(window.localStorage.getItem("session"))._id,
            chooseYear: this.value
          }
        }).then(({ data }) => {
          // console.log(data);
          if (this.radio == "按季度显示") {
            this.xAxis = data.axisDataQuarter;
            this.seriesDataService = data.seriesDataServiceQuter;
            myChart.setOption(this.serQuterOption, true);
          } else if (this.radio == "按年份显示") {
            this.seriesDataProYear = data.seriesDataProYear;
            this.seriesDataServiceYear = data.seriesDataServiceYear;
            myChart.setOption(this.pieOption, true);
          } else {
            this.xAxis = data.axisDataMonth;
            this.seriesDataService = data.seriesDataService;
            myChart.setOption(this.serOption, true);
          }
          // console.log(this.xAxis, this.seriesDataService);
        });
      }
    },
    chooseYear(value) {
      this.value = new Date(value);
      this.showRep();
    },
    showBy() {
      this.showRep();
    }
  },
  computed: {
    proOption() {
      return {
        title: {
          text: "店铺商品销量统计"
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
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxis
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
            stack: "食品",
            barWidth: 10,
            color: "#61a0a8",
            data: [
              this.seriesDataPro[0][1].value,
              this.seriesDataPro[1][1].value,
              this.seriesDataPro[2][1].value,
              this.seriesDataPro[3][1].value,
              this.seriesDataPro[4][1].value,
              this.seriesDataPro[5][1].value,
              this.seriesDataPro[6][1].value,
              this.seriesDataPro[7][1].value,
              this.seriesDataPro[8][1].value,
              this.seriesDataPro[9][1].value,
              this.seriesDataPro[10][1].value,
              this.seriesDataPro[11][1].value
            ]
          },
          {
            name: "猫粮",
            type: "bar",
            stack: "食品",
            barWidth: 10,
            color: "#d48265",
            data: [
              this.seriesDataPro[0][0].value,
              this.seriesDataPro[1][0].value,
              this.seriesDataPro[2][0].value,
              this.seriesDataPro[3][0].value,
              this.seriesDataPro[4][0].value,
              this.seriesDataPro[5][0].value,
              this.seriesDataPro[6][0].value,
              this.seriesDataPro[7][0].value,
              this.seriesDataPro[8][0].value,
              this.seriesDataPro[9][0].value,
              this.seriesDataPro[10][0].value,
              this.seriesDataPro[11][0].value
            ]
          },
          {
            name: "其他",
            type: "bar",
            barWidth: 10,
            color: "#91c7ae",
            data: [
              this.seriesDataPro[0][2].value,
              this.seriesDataPro[1][2].value,
              this.seriesDataPro[2][2].value,
              this.seriesDataPro[3][2].value,
              this.seriesDataPro[4][2].value,
              this.seriesDataPro[5][2].value,
              this.seriesDataPro[6][2].value,
              this.seriesDataPro[7][2].value,
              this.seriesDataPro[8][2].value,
              this.seriesDataPro[9][2].value,
              this.seriesDataPro[10][2].value,
              this.seriesDataPro[11][2].value
            ]
          }
        ]
      };
    },
    serOption() {
      return {
        title: {
          text: "店铺服务销量统计"
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
            data: this.xAxis
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
            stack: "服务",
            color: "#61a0a8",
            data: [
              this.seriesDataService[0][0].value,
              this.seriesDataService[1][0].value,
              this.seriesDataService[2][0].value,
              this.seriesDataService[3][0].value,
              this.seriesDataService[4][0].value,
              this.seriesDataService[5][0].value,
              this.seriesDataService[6][0].value,
              this.seriesDataService[7][0].value,
              this.seriesDataService[8][0].value,
              this.seriesDataService[9][0].value,
              this.seriesDataService[10][0].value,
              this.seriesDataService[11][0].value
            ]
          },
          {
            name: "洗护服务",
            type: "bar",
            barWidth: 10,
            stack: "服务",
            color: "#d48265",
            data: [
              this.seriesDataService[0][1].value,
              this.seriesDataService[1][1].value,
              this.seriesDataService[2][1].value,
              this.seriesDataService[3][1].value,
              this.seriesDataService[4][1].value,
              this.seriesDataService[5][1].value,
              this.seriesDataService[6][1].value,
              this.seriesDataService[7][1].value,
              this.seriesDataService[8][1].value,
              this.seriesDataService[9][1].value,
              this.seriesDataService[10][1].value,
              this.seriesDataService[11][1].value
            ]
          },
          {
            name: "其他",
            type: "bar",
            barWidth: 10,
            color: "#91c7ae",
            data: [
              this.seriesDataService[0][2].value,
              this.seriesDataService[1][2].value,
              this.seriesDataService[2][2].value,
              this.seriesDataService[3][2].value,
              this.seriesDataService[4][2].value,
              this.seriesDataService[5][2].value,
              this.seriesDataService[6][2].value,
              this.seriesDataService[7][2].value,
              this.seriesDataService[8][2].value,
              this.seriesDataService[9][2].value,
              this.seriesDataService[10][2].value,
              this.seriesDataService[11][2].value
            ]
          }
        ]
      };
    },
    proQuterOption() {
      return {
        title: {
          text: "店铺商品销量统计"
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
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxis
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
            stack: "食品",
            barWidth: 10,
            color: "#61a0a8",
            data: [
              this.seriesDataPro[0][1].value,
              this.seriesDataPro[1][1].value,
              this.seriesDataPro[2][1].value,
              this.seriesDataPro[3][1].value
            ]
          },
          {
            name: "猫粮",
            type: "bar",
            stack: "食品",
            barWidth: 10,
            color: "#d48265",
            data: [
              this.seriesDataPro[0][0].value,
              this.seriesDataPro[1][0].value,
              this.seriesDataPro[2][0].value,
              this.seriesDataPro[3][0].value
            ]
          },
          {
            name: "其他",
            type: "bar",
            barWidth: 10,
            color: "#91c7ae",
            data: [
              this.seriesDataPro[0][2].value,
              this.seriesDataPro[1][2].value,
              this.seriesDataPro[2][2].value,
              this.seriesDataPro[3][2].value
            ]
          }
        ]
      };
    },
    serQuterOption() {
      return {
        title: {
          text: "店铺服务销量统计"
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
            data: this.xAxis
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
            stack: "服务",
            color: "#61a0a8",
            data: [
              this.seriesDataService[0][0].value,
              this.seriesDataService[1][0].value,
              this.seriesDataService[2][0].value,
              this.seriesDataService[3][0].value
            ]
          },
          {
            name: "洗护服务",
            type: "bar",
            barWidth: 10,
            stack: "服务",
            color: "#d48265",
            data: [
              this.seriesDataService[0][1].value,
              this.seriesDataService[1][1].value,
              this.seriesDataService[2][1].value,
              this.seriesDataService[3][1].value
            ]
          },
          {
            name: "其他",
            type: "bar",
            barWidth: 10,
            color: "#91c7ae",
            data: [
              this.seriesDataService[0][2].value,
              this.seriesDataService[1][2].value,
              this.seriesDataService[2][2].value,
              this.seriesDataService[3][2].value
            ]
          }
        ]
      };
    },
    pieOption() {
      return {
        backgroundColor: "#2c343c",

        title: {
          text: "年销售额",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc"
          }
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "数据来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: this.seriesDataProYear[0].value, name: "狗粮" },
              { value: this.seriesDataProYear[1].value, name: "猫粮" },
              {
                value:
                  parseInt(this.seriesDataProYear[2].value) +
                  parseInt(this.seriesDataServiceYear[2].value),
                name: "其他"
              },
              { value: this.seriesDataServiceYear[0].value, name: "寄养服务" },
              { value: this.seriesDataServiceYear[1].value, name: "洗护服务" }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              normal: {
                textStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: "#c23531",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random(idx) * 200;
            }
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
.block {
  display: inline-block;
  margin-left: 15px;
}
</style>
